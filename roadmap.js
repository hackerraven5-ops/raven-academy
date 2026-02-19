/**
 * RAVEN Academy - Roadmap Logic Module
 * © 2026 hacker_.raven
 * 
 * Handles interactive roadmap functionality, step management, and progress tracking
 */

(function() {
    'use strict';

    // 🎯 Roadmap Configuration
    const RoadmapConfig = {
        levels: ['beginner', 'intermediate', 'professional'],
        stepsPerPage: 5,
        autoSaveProgress: true,
        requireSequential: false, // Allow skipping steps or not
        completionThreshold: 0.8 // 80% to consider level "completed"
    };

    // 📦 Roadmap State
    const RoadmapState = {
        currentLevel: 'beginner',
        expandedSteps: new Set(),
        filters: {
            completed: null, // null = all, true = only completed, false = only pending
            hasResources: false
        }
    };

    // 🎯 Public Roadmap API
    const Roadmap = {
        
        /**
         * Initialize roadmap for a specific level
         * @param {string} level - beginner | intermediate | professional
         * @param {string} containerId - DOM element ID to render into
         */
        init: async function(level, containerId) {
            RoadmapState.currentLevel = level;
            const container = document.getElementById(containerId);
            
            if (!container) {
                console.error(`Container #${containerId} not found`);
                return false;
            }
            
            // Show loading state
            container.innerHTML = Roadmap.templates.loading();
            
            try {
                // Fetch roadmap data
                const steps = await Roadmap.fetchSteps(level);
                
                if (!steps || steps.length === 0) {
                    container.innerHTML = Roadmap.templates.empty(level);
                    return false;
                }
                
                // Render steps
                container.innerHTML = Roadmap.renderSteps(steps, level);
                
                // Bind events
                Roadmap.bindEvents(container);
                
                // Load saved progress
                Roadmap.loadProgress(level);
                
                // Trigger reveal animation
                setTimeout(() => {
                    container.classList.add('loaded');
                }, 100);
                
                return true;
                
            } catch (error) {
                console.error('Roadmap init error:', error);
                container.innerHTML = Roadmap.templates.error();
                return false;
            }
        },
        
        /**
         * Fetch roadmap steps from resources
         * @private
         */
        fetchSteps: async function(level) {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Get from global resources
            if (window.RAVEN_RESOURCES && window.RAVEN_RESOURCES[level]) {
                return window.RAVEN_RESOURCES[level];
            }
            
            // Fallback: Generate placeholder steps
            return Roadmap.generatePlaceholderSteps(level, 25);
        },
        
        /**
         * Render steps HTML
         * @private
         */
        renderSteps: function(steps, level) {
            const progress = Roadmap.getProgress(level);
            
            return `
                ${Roadmap.templates.header(level, steps.length)}
                <div class="roadmap-steps" data-level="${level}">
                    ${steps.map((step, index) => 
                        Roadmap.templates.step(step, index + 1, progress, level)
                    ).join('')}
                </div>
                ${steps.length > RoadmapConfig.stepsPerPage ? 
                    Roadmap.templates.loadMore(level) : ''}
            `;
        },
        
        /**
         * Bind event listeners to roadmap elements
         * @private
         */
        bindEvents: function(container) {
            // Step toggle details
            container.querySelectorAll('.step-toggle').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    Roadmap.toggleStepDetails(e.currentTarget);
                });
            });
            
            // Mark step complete
            container.querySelectorAll('.mark-complete').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const stepNum = parseInt(e.currentTarget.dataset.step);
                    Roadmap.markComplete(RoadmapState.currentLevel, stepNum);
                });
            });
            
            // Load more button
            const loadMoreBtn = container.querySelector('.load-more-btn');
            if (loadMoreBtn) {
                loadMoreBtn.addEventListener('click', () => {
                    Roadmap.loadMoreSteps(container);
                });
            }
            
            // Resource links - track clicks
            container.querySelectorAll('.resource-link').forEach(link => {
                link.addEventListener('click', (e) => {
                    Roadmap.trackResourceClick(e.currentTarget);
                });
            });
        },
        
        /**
         * Toggle step details visibility
         */
        toggleStepDetails: function(btn) {
            const step = btn.closest('.roadmap-step');
            const details = step?.querySelector('.step-details');
            const icon = btn.querySelector('i');
            
            if (!details) return;
            
            const isExpanded = details.classList.contains('active');
            details.classList.toggle('active', !isExpanded);
            btn.setAttribute('aria-expanded', !isExpanded);
            
            if (icon) {
                icon.classList.toggle('fa-chevron-down', isExpanded);
                icon.classList.toggle('fa-chevron-up', !isExpanded);
            }
            
            // Save expanded state
            const stepNum = step?.dataset.step;
            if (stepNum) {
                if (!isExpanded) {
                    RoadmapState.expandedSteps.add(`${RoadmapState.currentLevel}-${stepNum}`);
                } else {
                    RoadmapState.expandedSteps.delete(`${RoadmapState.currentLevel}-${stepNum}`);
                }
            }
        },
        
        /**
         * Mark a step as completed
         */
        markComplete: function(level, stepNumber) {
            const progress = Roadmap.getProgress(level);
            
            if (!progress.completed.includes(stepNumber)) {
                progress.completed.push(stepNumber);
                
                // Auto-advance to next step if sequential
                if (RoadmapConfig.requireSequential && 
                    progress.current === stepNumber) {
                    progress.current = stepNumber + 1;
                }
                
                // Save progress
                if (RoadmapConfig.autoSaveProgress) {
                    Roadmap.saveProgress(level, progress);
                }
                
                // Update UI
                Roadmap.updateStepUI(level, stepNumber, true);
                
                // Show achievement if milestone reached
                Roadmap.checkAchievements(level, progress);
                
                // Trigger callback if exists
                if (typeof window.onStepComplete === 'function') {
                    window.onStepComplete(level, stepNumber, progress);
                }
                
                return true;
            }
            return false;
        },
        
        /**
         * Update step UI after completion
         * @private
         */
        updateStepUI: function(level, stepNumber, completed) {
            const step = document.querySelector(
                `.roadmap-steps[data-level="${level}"] .roadmap-step[data-step="${stepNumber}"]`
            );
            
            if (!step) return;
            
            if (completed) {
                step.classList.add('completed');
                const marker = step.querySelector('.step-marker');
                if (marker) {
                    marker.classList.add('completed');
                    marker.innerHTML = '<i class="fas fa-check"></i>';
                }
                
                // Hide complete button, show next action
                const actions = step.querySelector('.step-actions');
                if (actions) {
                    actions.innerHTML = `
                        <span class="completed-badge">
                            <i class="fas fa-check-circle"></i> مكتمل ✓
                        </span>
                    `;
                }
            }
        },
        
        /**
         * Load saved progress from localStorage
         */
        loadProgress: function(level) {
            const saved = localStorage.getItem(`raven-progress-${level}`);
            if (saved) {
                try {
                    const progress = JSON.parse(saved);
                    progress.completed?.forEach(stepNum => {
                        Roadmap.updateStepUI(level, stepNum, true);
                    });
                } catch (e) {
                    console.error('Error loading progress:', e);
                }
            }
        },
        
        /**
         * Save progress to localStorage
         */
        saveProgress: function(level, progress) {
            try {
                localStorage.setItem(
                    `raven-progress-${level}`, 
                    JSON.stringify(progress)
                );
            } catch (e) {
                console.error('Error saving progress:', e);
            }
        },
        
        /**
         * Get progress object for a level
         */
        getProgress: function(level) {
            const saved = localStorage.getItem(`raven-progress-${level}`);
            return saved ? JSON.parse(saved) : {
                completed: [],
                current: 1,
                startedAt: new Date().toISOString(),
                lastUpdated: new Date().toISOString()
            };
        },
        
        /**
         * Calculate completion percentage
         */
        getCompletionPercent: async function(level) {
            const steps = await Roadmap.fetchSteps(level);
            const progress = Roadmap.getProgress(level);
            
            if (!steps.length) return 0;
            return Math.round((progress.completed.length / steps.length) * 100);
        },
        
        /**
         * Check and trigger achievements
         * @private
         */
        checkAchievements: function(level, progress) {
            const achievements = [
                { id: 'first-step', condition: p => p.completed.length === 1, title: '🎯 البداية' },
                { id: 'quarter', condition: p => p.completed.length >= Math.ceil(25 * 0.25), title: '📈 تقدم جيد' },
                { id: 'halfway', condition: p => p.completed.length >= Math.ceil(25 * 0.5), title: '🔥 نصف الطريق' },
                { id: 'complete', condition: p => p.completed.length >= 25, title: '🏆 مسار مكتمل' }
            ];
            
            achievements.forEach(achievement => {
                const key = `achievement-${level}-${achievement.id}`;
                if (achievement.condition(progress) && !localStorage.getItem(key)) {
                    localStorage.setItem(key, 'true');
                    
                    // Show achievement notification
                    if (typeof window.showAchievement === 'function') {
                        window.showAchievement(achievement.title);
                    } else {
                        console.log(`🏆 Achievement unlocked: ${achievement.title}`);
                    }
                }
            });
        },
        
        /**
         * Track resource link clicks (analytics)
         * @private
         */
        trackResourceClick: function(link) {
            const step = link.closest('.roadmap-step');
            const data = {
                level: RoadmapState.currentLevel,
                step: step?.dataset.step,
                resource: link.href,
                timestamp: new Date().toISOString()
            };
            
            // TODO: Send to analytics endpoint
            console.log('Resource clicked:', data);
            
            // Optional: Mark step as "viewed"
            // Roadmap.markViewed(RoadmapState.currentLevel, parseInt(step?.dataset.step));
        },
        
        /**
         * Load more steps (pagination)
         * @private
         */
        loadMoreSteps: function(container) {
            const loadMoreBtn = container.querySelector('.load-more-btn');
            if (!loadMoreBtn) return;
            
            // Show all hidden steps (simplified)
            const steps = container.querySelectorAll('.roadmap-step');
            steps.forEach(step => {
                step.style.display = 'flex';
            });
            
            // Remove load more button
            loadMoreBtn.closest('.roadmap-load-more')?.remove();
        },
        
        /**
         * Reset progress for a level
         */
        resetProgress: function(level) {
            if (confirm('⚠️ هل أنت متأكد من إعادة تعيين تقدم هذا المسار؟')) {
                localStorage.removeItem(`raven-progress-${level}`);
                location.reload(); // Refresh to reset UI
            }
        },
        
        /**
         * Export progress as JSON
         */
        exportProgress: function(level) {
            const progress = Roadmap.getProgress(level);
            const data = {
                level,
                progress,
                exportedAt: new Date().toISOString(),
                version: '1.0'
            };
            
            const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `raven-progress-${level}.json`;
            a.click();
            URL.revokeObjectURL(url);
        },
        
        // 🎨 HTML Templates
        templates: {
            loading: () => `
                <div class="loading-steps">
                    <div class="spinner"></div>
                    <p>جاري تحميل خريطة التعلم...</p>
                </div>
            `,
            
            empty: (level) => `
                <div class="no-steps">
                    <i class="fas fa-tools fa-3x" style="color: var(--text-muted); margin-bottom: 1rem;"></i>
                    <p>🚧 جاري إعداد محتوى مسار <strong>${getLevelName(level)}</strong></p>
                    <p style="font-size: var(--font-size-sm); color: var(--text-muted);">
                        عد قريباً لمحتوى جديد ومصادر حصرية!
                    </p>
                </div>
            `,
            
            error: () => `
                <div class="error">
                    <i class="fas fa-exclamation-triangle fa-2x" style="color: var(--accent-danger); margin-bottom: 1rem;"></i>
                    <p>❌ حدث خطأ في تحميل المحتوى</p>
                    <button class="btn-sm btn-secondary" onclick="location.reload()">
                        <i class="fas fa-redo"></i> إعادة المحاولة
                    </button>
                </div>
            `,
            
            header: (level, totalSteps) => `
                <div class="roadmap-header">
                    <h3>${getLevelIcon(level)} خريطة ${getLevelName(level)}</h3>
                    <p>${totalSteps} خطوة تعليمية • كل خطوة تحتوي على مصادر يوتيوب موثوقة</p>
                    <div class="roadmap-progress-mini">
                        <div class="progress-info">
                            <span>تقدمك:</span>
                            <span id="progress-${level}">0%</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" id="progress-fill-${level}" style="width: 0%"></div>
                        </div>
                    </div>
                </div>
            `,
            
            step: (step, number, progress, level) => {
                const isCompleted = progress.completed?.includes(number);
                const isCurrent = progress.current === number;
                
                return `
                    <div class="roadmap-step ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}" 
                         data-step="${number}">
                        <div class="step-marker ${isCompleted ? 'completed' : ''}">
                            <span class="step-number">${number}</span>
                            ${isCompleted ? '<i class="fas fa-check"></i>' : ''}
                        </div>
                        <div class="step-content">
                            <h4>${step.title}</h4>
                            <p>${step.description}</p>
                            
                            ${step.resources?.length ? `
                            <div class="step-resources">
                                ${step.resources.map(res => `
                                <a href="${res.url}" target="_blank" rel="noopener" 
                                   class="resource-link youtube">
                                    <i class="fab fa-youtube"></i>
                                    <span>${res.title}</span>
                                    <span class="duration">${res.duration}</span>
                                </a>
                                `).join('')}
                            </div>` : ''}
                            
                            ${step.objectives?.length ? `
                            <button class="step-toggle" aria-expanded="false">
                                عرض التفاصيل <i class="fas fa-chevron-down"></i>
                            </button>
                            <div class="step-details">
                                <ul>
                                    ${step.objectives.map(obj => `<li>✓ ${obj}</li>`).join('')}
                                </ul>
                            </div>` : ''}
                            
                            <div class="step-actions">
                                ${!isCompleted ? `
                                <button class="btn-sm btn-success mark-complete" data-step="${number}">
                                    <i class="fas fa-check"></i> أكملت هذه الخطوة
                                </button>` : `
                                <span class="completed-badge">
                                    <i class="fas fa-check-circle"></i> مكتمل ✓
                                </span>`}
                            </div>
                        </div>
                    </div>
                `;
            },
            
            loadMore: (level) => `
                <div class="roadmap-load-more">
                    <button class="btn-secondary load-more-btn" data-level="${level}">
                        عرض المزيد من الخطوات <i class="fas fa-plus"></i>
                    </button>
                </div>
            `
        },
        
        // 🎲 Generate placeholder steps for demo
        generatePlaceholderSteps: function(level, count) {
            const prefixes = {
                beginner: ['مقدمة', 'أساسيات', 'بداية', 'تعلم'],
                intermediate: ['متقدم', 'تطبيق', 'تحليل', 'اختبار'],
                professional: ['احترافي', 'هندسة', 'تطوير', 'قيادة']
            };
            
            return Array.from({length: count}, (_, i) => ({
                step: i + 1,
                title: `${prefixes[level][i % 4]} في الأمن السيبراني #${i + 1}`,
                description: `تعلم مهارة جديدة في مجال الأمن السيبراني والاختراق الأخلاقي`,
                objectives: [
                    `فهم المفهوم الأساسي للدرس ${i + 1}`,
                    'تطبيق عملي على أداة أو تقنية',
                    'حل تمرين تدريبي',
                    'مراجعة وتقييم الذات'
                ],
                resources: [{
                    title: `شرح الفيديو للدرس ${i + 1}`,
                    url: `https://youtube.com/watch?v=placeholder${level}${i+1}`,
                    duration: `${Math.floor(Math.random() * 30) + 10}:00`,
                    channel: 'RAVEN Academy'
                }],
                completed: false
            }));
        }
    };
    
    // 🔧 Helper Functions
    function getLevelName(level) {
        const names = {
            beginner: 'المبتدئ',
            intermediate: 'المتوسط',
            professional: 'المحترف'
        };
        return names[level] || level;
    }
    
    function getLevelIcon(level) {
        const icons = {
            beginner: '🌱',
            intermediate: '🔥',
            professional: '👑'
        };
        return icons[level] || '📚';
    }
    
    // 🌍 Export to global scope
    window.RAVEN_Roadmap = Roadmap;
    
    // 🎯 Auto-init if elements exist
    document.addEventListener('DOMContentLoaded', () => {
        // Check for roadmap containers and auto-initialize
        RoadmapConfig.levels.forEach(level => {
            const container = document.getElementById(`${level}-roadmap`);
            if (container && !container.dataset.initialized) {
                Roadmap.init(level, `${level}-roadmap`);
                container.dataset.initialized = 'true';
            }
        });
    });
    
})();
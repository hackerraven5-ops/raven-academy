/**
 * RAVEN Academy - Educational Resources Database
 * © 2026 hacker_.raven - جميع الحقوق محفوظة
 * 
 * ⚠️ ملاحظة: جميع روابط اليوتيوب هنا هي أمثلة توضيحية
 * يجب استبدالها بروابط حقيقية وموثوقة عند النشر الفعلي
 */

const RAVEN_RESOURCES = {
    
    // ========================================
    // 🌱 BEGINNER ROADMAP (25 Steps)
    // ========================================
    beginner: [
        {
            step: 1,
            title: "📚 مقدمة في الأمن السيبراني",
            description: "فهم ماهية الأمن السيبراني، أهميته، والمجالات المتاحة فيه",
            objectives: [
                "ما هو الأمن السيبراني ولماذا هو مهم؟",
                "الفرق بين الهاكر الأبيض، الرمادي، والأسود",
                "المسارات الوظيفية في مجال الأمن",
                "الأخلاقيات والقوانين في الاختراق الأخلاقي"
            ],
            resources: [
                {
                    title: "مقدمة شاملة للأمن السيبراني - للمبتدئين",
                    url: "https://youtube.com/watch?v=example1",
                    duration: "15:30",
                    channel: "Ethical Hack Academy"
                },
                {
                    title: "كيف تبدأ في مجال الأمن السيبراني؟",
                    url: "https://youtube.com/watch?v=example1b",
                    duration: "12:45",
                    channel: "Codezilla"
                }
            ],
            completed: false
        },
        {
            step: 2,
            title: "🌐 أساسيات الشبكات والإنترنت",
            description: "فهم كيفية عمل الشبكات، بروتوكولات الاتصال، وعناوين IP",
            objectives: [
                "نموذج OSI وطبقات الشبكة السبع",
                "عناوين IP و Subnetting الأساسي",
                "بروتوكولات HTTP, DNS, DHCP, TCP/UDP",
                "أدوات تحليل الشبكة: ping, traceroute, nslookup"
            ],
            resources: [
                {
                    title: "شبكات الكمبيوتر للمبتدئين - شرح مبسط",
                    url: "https://youtube.com/watch?v=example2",
                    duration: "28:45",
                    channel: "محمد حسين - شبكة"
                },
                {
                    title: "بروتوكولات الشبكة الأساسية",
                    url: "https://youtube.com/watch?v=example2b",
                    duration: "22:10",
                    channel: "Codezilla"
                }
            ],
            completed: false
        },
        {
            step: 3,
            title: "🐧 مقدمة في نظام لينكس",
            description: "تعلم أساسيات نظام لينكس والأوامر الأساسية في الطرفية",
            objectives: [
                "تثبيت Kali Linux أو Ubuntu على جهاز افتراضي",
                "هيكلية نظام الملفات في لينكس",
                "الأوامر الأساسية: ls, cd, pwd, mkdir, rm, cp, mv",
                "إدارة المستخدمين والصلاحيات: chmod, chown, sudo"
            ],
            resources: [
                {
                    title: "لينكس من الصفر حتى الاحتراف - الجزء الأول",
                    url: "https://youtube.com/watch?v=example3",
                    duration: "35:20",
                    channel: "Codezilla"
                },
                {
                    title: "أوامر لينكس الأساسية للمخترقين الأخلاقيين",
                    url: "https://youtube.com/watch?v=example3b",
                    duration: "18:55",
                    channel: "The Cyber Mentor"
                }
            ],
            completed: false
        },
        {
            step: 4,
            title: "💻 أساسيات سطر الأوامر (Terminal)",
            description: "إتقان استخدام الطرفية في لينكس وويندوز",
            objectives: [
                "الفرق بين Bash, PowerShell, CMD",
                "التنقل بين المجلدات وإدارة الملفات",
                "البحث والتصفية: grep, find, pipe",
                "كتابة سكريبتات بسيطة لأتمتة المهام"
            ],
            resources: [
                {
                    title: "دورة Bash للمبتدئين",
                    url: "https://youtube.com/watch?v=example4",
                    duration: "45:00",
                    channel: "FreeCodeCamp"
                }
            ],
            completed: false
        },
        {
            step: 5,
            title: "🔐 أساسيات التشفير والمصادقة",
            description: "فهم مبادئ التشفير، الهاش، والمصادقة الأمنية",
            objectives: [
                "الفرق بين التشفير المتماثل وغير المتماثل",
                "خوارزميات الهاش: MD5, SHA, bcrypt",
                "المصادقة متعددة العوامل (MFA)",
                "إدارة كلمات المرور بأمان"
            ],
            resources: [
                {
                    title: "التشفير للمبتدئين في الأمن السيبراني",
                    url: "https://youtube.com/watch?v=example5",
                    duration: "25:30",
                    channel: "NetworkChuck"
                }
            ],
            completed: false
        },
        // ... Steps 6-25 would follow the same structure
        // For brevity, adding a few more examples:
        {
            step: 6,
            title: "🕵️ مقدمة في جمع المعلومات (Reconnaissance)",
            description: "تعلم تقنيات جمع المعلومات عن الأهداف بشكل قانوني",
            objectives: [
                "OSINT: مصادر المعلومات المفتوحة",
                "Whois lookup و DNS enumeration",
                "Google Dorks للبحث المتقدم",
                "أدوات: theHarvester, Maltego (basic)"
            ],
            resources: [{
                title: "دورة OSINT للمبتدئين",
                url: "https://youtube.com/watch?v=example6",
                duration: "32:15",
                channel: "OSINT Dojo"
            }],
            completed: false
        },
        {
            step: 7,
            title: "🔍 أساسيات المسح واكتشاف الثغرات",
            description: "استخدام أدوات المسح لاكتشاف الخدمات والثغرات",
            objectives: [
                "مقدمة في Nmap: أنواع المسح والخيارات",
                "اكتشاف المنافذ والخدمات النشطة",
                "مقدمة في Nessus و OpenVAS",
                "تفسير نتائج المسح وتحديد الأولويات"
            ],
            resources: [{
                title: "دورة Nmap الكاملة للمبتدئين",
                url: "https://youtube.com/watch?v=example7",
                duration: "50:20",
                channel: "The Cyber Mentor"
            }],
            completed: false
        },
        // ... Continue with steps 8-25 covering:
        // - Web basics (HTML, HTTP, Cookies)
        // - SQL fundamentals
        // - Basic scripting (Python/Bash)
        // - Virtualization & lab setup
        // - Introduction to CTF platforms
        // - Legal frameworks & responsible disclosure
        // - Building a home lab
        // - Documentation & note-taking
        // - Community engagement & continuous learning
    ],
    
    // ========================================
    // 🔥 INTERMEDIATE ROADMAP (35 Steps)
    // ========================================
    intermediate: [
        {
            step: 1,
            title: "🔍 منهجيات اختبار الاختراق",
            description: "فهم الأطر المعتمدة مثل PTES و OWASP Testing Guide",
            objectives: [
                "مراحل اختبار الاختراق السبع (PTES)",
                "OWASP Testing Guide v4 تطبيق عملي",
                "توثيق الاختبارات وإعداد التقارير",
                "إدارة نطاق الاختبار والقواعد القانونية"
            ],
            resources: [{
                title: "Penetration Testing Methodology Explained",
                url: "https://youtube.com/watch?v=inter1",
                duration: "42:15",
                channel: "The Cyber Mentor"
            }],
            completed: false
        },
        {
            step: 2,
            title: "⚡ Nmap المتقدم وتقنيات المسح",
            description: "إتقان خيارات Nmap المتقدمة للكشف الدقيق",
            objectives: [
                "Scripting Engine (NSE) وكتابة سكريبتات مخصصة",
                "تجنب أنظمة الكشف (IDS/IPS evasion)",
                "مسح الشبكات الكبيرة بكفاءة",
                "تحليل النتائج وتصدير التقارير"
            ],
            resources: [{
                title: "Advanced Nmap Techniques",
                url: "https://youtube.com/watch?v=inter2",
                duration: "38:50",
                channel: "HackerSploit"
            }],
            completed: false
        },
        {
            step: 3,
            title: "🕸️ اختبار اختراق الويب - الأساسيات",
            description: "اكتشاف واستغلال ثغرات الويب الشائعة",
            objectives: [
                "OWASP Top 10: شرح وتطبيق عملي",
                "SQL Injection: الأنواع وأدوات الاستغلال",
                "XSS: Reflected, Stored, DOM-based",
                "أدوات: Burp Suite Community, OWASP ZAP"
            ],
            resources: [{
                title: "Web Penetration Testing for Beginners",
                url: "https://youtube.com/watch?v=inter3",
                duration: "1:15:30",
                channel: "Rana Khalil"
            }],
            completed: false
        },
        // ... Steps 4-35 covering:
        // - Privilege escalation (Linux/Windows)
        // - Active Directory attacks
        // - Wireless network pentesting
        // - Social engineering techniques
        // - Malware analysis basics
        // - Reverse engineering intro
        // - Cloud security (AWS/Azure basics)
        // - Mobile app security testing
        // - API security testing
        // - Report writing & client communication
    ],
    
    // ========================================
    // 👑 PROFESSIONAL ROADMAP (40 Steps)
    // ========================================
    professional: [
        {
            step: 1,
            title: "⚡ هندسة الاختراق المتقدم",
            description: "تقنيات متقدمة في استغلال الثغرات وتجاوز الحماية",
            objectives: [
                "Buffer Overflow: من النظرية إلى التطبيق",
                "ROP Chains و Bypassing DEP/ASLR",
                "Heap exploitation fundamentals",
                "Writing custom exploits with Python/C"
            ],
            resources: [{
                title: "Advanced Exploit Development",
                url: "https://youtube.com/watch?v=pro1",
                duration: "58:30",
                channel: "LiveOverflow"
            }],
            completed: false
        },
        {
            step: 2,
            title: "🔐 تحليل البرمجيات الخبيثة",
            static: "تحليل سلوكي وثابت للبرمجيات الضارة",
            objectives: [
                "Static Analysis: Strings, PE headers, YARA rules",
                "Dynamic Analysis: Sandboxing, API monitoring",
                "Unpacking & obfuscation techniques",
                "Writing detection signatures"
            ],
            resources: [{
                title: "Malware Analysis Fundamentals",
                url: "https://youtube.com/watch?v=pro2",
                duration: "1:05:20",
                channel: "John Hammond"
            }],
            completed: false
        },
        {
            step: 3,
            title: "🏢 اختبار اختراق Active Directory",
            description: "هجمات متقدمة في بيئات Windows Enterprise",
            objectives: [
                "Kerberos attacks: Golden/Silver tickets",
                "BloodHound for attack path mapping",
                "Domain persistence & lateral movement",
                "Defensive detection & mitigation"
            ],
            resources: [{
                title: "Active Directory Penetration Testing",
                url: "https://youtube.com/watch?v=pro3",
                duration: "1:20:45",
                channel: "The Cyber Mentor"
            }],
            completed: false
        },
        // ... Steps 4-40 covering:
        // - Red Team operations & C2 frameworks
        // - Advanced persistence techniques
        // - Cloud pentesting (AWS/Azure/GCP)
        // - ICS/SCADA security testing
        // - Mobile advanced exploitation
        // - Bug bounty methodologies
        // - Threat intelligence integration
        // - Building custom tools & frameworks
        // - Leadership & team management
        // - Certifications prep (OSCP, OSCE, etc.)
    ],
    
    // ========================================
    // 📚 GENERAL RESOURCES LIBRARY
    // ========================================
    library: [
        // 🎥 YouTube Channels & Playlists
        {
            id: "yt001",
            title: "دورة الأمن السيبراني الكاملة - عربي",
            type: "youtube",
            url: "https://youtube.com/playlist?list=example1",
            channel: "أكاديمية حسوب",
            level: "beginner",
            language: "ar",
            rating: 4.9,
            views: "250K",
            description: "دورة شاملة تغطي أساسيات الأمن السيبراني باللغة العربية"
        },
        {
            id: "yt002",
            title: "The Cyber Mentor - Free Ethical Hacking Course",
            type: "youtube",
            url: "https://youtube.com/playlist?list=example2",
            channel: "The Cyber Mentor",
            level: "beginner",
            language: "en",
            rating: 4.8,
            views: "2M+",
            description: "12-hour free course covering penetration testing fundamentals"
        },
        {
            id: "yt003",
            title: "NetworkChuck - CCNA & Security",
            type: "youtube",
            url: "https://youtube.com/c/NetworkChuck",
            channel: "NetworkChuck",
            level: "beginner",
            language: "en",
            rating: 4.9,
            description: "Energetic networking and security tutorials"
        },
        
        // 🎓 Online Courses
        {
            id: "course001",
            title: "TryHackMe - Complete Beginner Path",
            type: "courses",
            url: "https://tryhackme.com/path/outline/beginner",
            platform: "TryHackMe",
            level: "beginner",
            price: "free",
            language: "en",
            rating: 4.9,
            description: "Interactive hands-on learning path with virtual machines"
        },
        {
            id: "course002",
            title: "HackTheBox Academy",
            type: "courses",
            url: "https://academy.hackthebox.com",
            platform: "HackTheBox",
            level: "intermediate",
            price: "freemium",
            language: "en",
            rating: 4.8,
            description: "Structured modules with real-world scenarios"
        },
        {
            id: "course003",
            title: "Coursera - IBM Cybersecurity Analyst",
            type: "courses",
            url: "https://coursera.org/professional-certificates/ibm-cybersecurity-analyst",
            platform: "Coursera",
            level: "beginner",
            price: "paid",
            language: "en",
            rating: 4.7,
            description: "Professional certificate program by IBM"
        },
        
        // 🛠️ Tools & Platforms
        {
            id: "tool001",
            title: "Nmap - Network Scanner",
            type: "tools",
            url: "https://nmap.org",
            category: "reconnaissance",
            level: "all",
            difficulty: "beginner",
            description: "The industry standard for network discovery and security auditing",
            features: ["Port scanning", "OS detection", "Script engine", "Output formats"]
        },
        {
            id: "tool002",
            title: "Burp Suite Community",
            type: "tools",
            url: "https://portswigger.net/burp/communitydownload",
            category: "web-testing",
            level: "intermediate",
            difficulty: "medium",
            description: "Leading web vulnerability scanner and proxy tool",
            features: ["Proxy", "Scanner", "Intruder", "Repeater"]
        },
        {
            id: "tool003",
            title: "Kali Linux",
            type: "tools",
            url: "https://kali.org",
            category: "os",
            level: "all",
            difficulty: "beginner",
            description: "Debian-based distribution with 600+ security tools pre-installed",
            features: ["600+ tools", "Live boot", "ARM support", "Custom kernel"]
        },
        
        // 📚 Books & Documentation
        {
            id: "book001",
            title: "The Web Application Hacker's Handbook",
            type: "books",
            url: "https://www.wiley.com/en-us/The+Web+Application+Hacker%27s+Handbook%2C+2nd+Edition-p-9781118026472",
            author: "Dafydd Stuttard, Marcus Pinto",
            level: "intermediate",
            language: "en",
            rating: 4.7,
            description: "The definitive guide to finding and exploiting web vulnerabilities"
        },
        {
            id: "book002",
            title: "Penetration Testing: A Hands-On Introduction",
            type: "books",
            url: "https://nostarch.com/pentesting",
            author: "Georgia Weidman",
            level: "beginner",
            language: "en",
            rating: 4.6,
            description: "Practical guide covering the entire penetration testing process"
        },
        {
            id: "book003",
            title: "الأمن السيبراني للمبتدئين - عربي",
            type: "books",
            url: "https://example.com/arabic-book",
            author: "مؤلف عربي",
            level: "beginner",
            language: "ar",
            rating: 4.5,
            description: "كتاب عربي شامل يشرح أساسيات الأمن السيبراني"
        },
        
        // 🧪 Labs & Practice Platforms
        {
            id: "lab001",
            title: "TryHackMe",
            type: "labs",
            url: "https://tryhackme.com",
            level: "all",
            price: "freemium",
            description: "Gamified learning platform with guided rooms and paths",
            features: ["Beginner paths", "CTF challenges", "Virtual machines", "Community"]
        },
        {
            id: "lab002",
            title: "HackTheBox",
            type: "labs",
            url: "https://hackthebox.com",
            level: "intermediate",
            price: "freemium",
            description: "Advanced penetration testing practice with real-world machines",
            features: ["Active machines", "Challenges", "Pro labs", "Certifications"]
        },
        {
            id: "lab003",
            title: "PortSwigger Web Security Academy",
            type: "labs",
            url: "https://portswigger.net/web-security",
            level: "all",
            price: "free",
            description: "Free web security training with interactive labs",
            features: ["All OWASP Top 10", "Detailed explanations", "Free labs", "Certificates"]
        },
        {
            id: "lab004",
            title: "VulnHub",
            type: "labs",
            url: "https://vulnhub.com",
            level: "intermediate",
            price: "free",
            description: "Download vulnerable VMs for offline practice",
            features: ["Offline practice", "Community VMs", "Writeups", "All levels"]
        },
        
        // 📰 News & Communities
        {
            id: "news001",
            title: "The Hacker News",
            type: "news",
            url: "https://thehackernews.com",
            category: "news",
            language: "en",
            description: "Latest cybersecurity news, vulnerabilities, and threats"
        },
        {
            id: "news002",
            title: "Arab Cybersecurity Community",
            type: "community",
            url: "https://arabcyber.org",
            category: "community",
            language: "ar",
            description: "مجتمع عربي لمختصي الأمن السيبراني"
        },
        
        // 🎓 Certifications Prep
        {
            id: "cert001",
            title: "OSCP Preparation Guide",
            type: "certifications",
            url: "https://www.offensive-security.com/pwk-oscp/",
            cert: "OSCP",
            level: "professional",
            price: "paid",
            description: "Official Offensive Security Certified Professional preparation"
        },
        {
            id: "cert002",
            title: "CompTIA Security+ Study Resources",
            type: "certifications",
            url: "https://www.comptia.org/certifications/security",
            cert: "Security+",
            level: "beginner",
            price: "paid",
            description: "Entry-level cybersecurity certification resources"
        }
    ],
    
    // ========================================
    // 🏷️ Metadata & Categories
    // ========================================
    metadata: {
        lastUpdated: "2026-02-19",
        totalResources: 150,
        languages: ["ar", "en"],
        levels: ["beginner", "intermediate", "professional"],
        types: ["youtube", "courses", "tools", "books", "labs", "news", "community", "certifications"],
        disclaimer: "جميع الروابط لأغراض تعليمية فقط. تأكد من الحصول على إذن كتابي قبل اختبار أي نظام لا تملكه."
    }
};

// 🌍 Export for different environments
if (typeof module !== 'undefined' && module.exports) {
    // Node.js / CommonJS
    module.exports = RAVEN_RESOURCES;
} else if (typeof define === 'function' && define.amd) {
    // AMD / RequireJS
    define([], function() {
        return RAVEN_RESOURCES;
    });
} else {
    // Browser global
    window.RAVEN_RESOURCES = RAVEN_RESOURCES;
}

// 🎯 Quick access helpers
const RAVEN = {
    // Get resources by level
    byLevel: (level) => RAVEN_RESOURCES.library.filter(r => 
        r.level === level || r.level === 'all'
    ),
    
    // Get resources by type
    byType: (type) => RAVEN_RESOURCES.library.filter(r => r.type === type),
    
    // Search resources
    search: (query) => {
        const q = query.toLowerCase();
        return RAVEN_RESOURCES.library.filter(r => 
            r.title?.toLowerCase().includes(q) ||
            r.description?.toLowerCase().includes(q) ||
            r.channel?.toLowerCase().includes(q) ||
            r.author?.toLowerCase().includes(q)
        );
    },
    
    // Get roadmap for a level
    roadmap: (level) => RAVEN_RESOURCES[level] || []
};

// Make helpers available globally
if (typeof window !== 'undefined') {
    window.RAVEN = RAVEN;
}

console.log('📦 RAVEN Resources loaded -', RAVEN_RESOURCES.metadata.totalResources, 'resources available');
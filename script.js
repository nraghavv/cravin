// ================================
// CRAVIN LANDING PAGE JAVASCRIPT
// Handles scroll animations, traffic simulation, and interactions
// ================================

document.addEventListener('DOMContentLoaded', () => {
    
    // ================================
    // SCROLL ANIMATIONS
    // ================================
    
    /**
     * Intersection Observer for scroll-triggered animations
     * Watches elements and adds 'visible' class when they enter viewport
     */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all elements with fade-in-scroll class
    const animatedElements = document.querySelectorAll('.fade-in-scroll');
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    
    // ================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offset = 0;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    
    // ================================
    // ORDER AVAILABILITY STATUS
    // ================================
    
    function updateOrderStatus() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const currentTimeInMinutes = hours * 60 + minutes;
        const startTime = 23 * 60 + 30; // 11:30 PM
        const endTime = 2 * 60; // 2:00 AM
        
        const statusIndicator = document.querySelector('.status-indicator');
        const statusDot = document.querySelector('.status-dot');
        const statusText = document.querySelector('.status-text');
        
        if (!statusIndicator || !statusDot || !statusText) return;
        
        const isOpen = currentTimeInMinutes >= startTime || currentTimeInMinutes <= endTime;
        
        if (isOpen) {
            statusIndicator.style.background = 'rgba(34, 197, 94, 0.1)';
            statusIndicator.style.borderColor = 'rgba(34, 197, 94, 0.3)';
            statusDot.style.background = '#22c55e';
            statusText.style.color = '#22c55e';
            statusText.textContent = '🟢 Orders OPEN now!';
        } else {
            statusIndicator.style.background = 'rgba(239, 68, 68, 0.1)';
            statusIndicator.style.borderColor = 'rgba(239, 68, 68, 0.3)';
            statusDot.style.background = '#ef4444';
            statusText.style.color = '#ef4444';
            statusText.textContent = '🔴 Orders open: 11:30 PM – 2:00 AM';
        }
    }
    
    updateOrderStatus();
    setInterval(updateOrderStatus, 60000);

    
    // ================================
    // REAL-TIME TRAFFIC SIMULATION
    // ================================
    
    /**
     * Simulates real-time traffic data
     * In production, replace with actual API calls
     */
    
    // Initial values
    let trafficData = {
        activeUsers: 3,
        todayOrders: 12,
        totalDeliveries: 247,
        avgTime: 18
    };
    
    // Animate counter from 0 to target value
    function animateCounter(element, target, duration = 1000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = Math.floor(target);
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
    
    // Initialize traffic counters
    function initializeTraffic() {
        const activeUsersEl = document.getElementById('activeUsers');
        const todayOrdersEl = document.getElementById('todayOrders');
        const totalDeliveriesEl = document.getElementById('totalDeliveries');
        const avgTimeEl = document.getElementById('avgTime');
        
        if (activeUsersEl) animateCounter(activeUsersEl, trafficData.activeUsers, 1000);
        if (todayOrdersEl) animateCounter(todayOrdersEl, trafficData.todayOrders, 1200);
        if (totalDeliveriesEl) animateCounter(totalDeliveriesEl, trafficData.totalDeliveries, 1500);
        if (avgTimeEl) animateCounter(avgTimeEl, trafficData.avgTime, 1000);
    }
    
    // Update traffic data with slight variations
    function updateTrafficData() {
        // Randomly fluctuate active users (1-8)
        const userChange = Math.random() > 0.5 ? 1 : -1;
        trafficData.activeUsers = Math.max(1, Math.min(8, trafficData.activeUsers + userChange));
        
        // Occasionally increment today's orders
        if (Math.random() > 0.7) {
            trafficData.todayOrders += 1;
            trafficData.totalDeliveries += 1;
        }
        
        // Slightly vary average delivery time (15-22 mins)
        const timeChange = (Math.random() - 0.5) * 2;
        trafficData.avgTime = Math.max(15, Math.min(22, trafficData.avgTime + timeChange));
        
        // Update DOM
        const activeUsersEl = document.getElementById('activeUsers');
        const todayOrdersEl = document.getElementById('todayOrders');
        const totalDeliveriesEl = document.getElementById('totalDeliveries');
        const avgTimeEl = document.getElementById('avgTime');
        
        if (activeUsersEl) activeUsersEl.textContent = trafficData.activeUsers;
        if (todayOrdersEl) todayOrdersEl.textContent = trafficData.todayOrders;
        if (totalDeliveriesEl) totalDeliveriesEl.textContent = trafficData.totalDeliveries;
        if (avgTimeEl) avgTimeEl.textContent = Math.floor(trafficData.avgTime);
    }
    
    // Initialize on page load
    setTimeout(initializeTraffic, 500);
    
    // Update every 10 seconds
    setInterval(updateTrafficData, 10000);

    
    // ================================
    // ACTIVITY FEED SIMULATION
    // ================================
    
    const hostels = ['Block A', 'Block B', 'Block C', 'Block D', 'North Wing', 'South Wing'];
    const items = [
        'Maggi', 'Chips', 'Cookies', 'Cold Drink', 'Sandwich', 'Biscuits',
        'Energy Drink', 'Chocolate', 'Instant Noodles', 'Snack Combo'
    ];
    const avatarEmojis = ['🧑', '👨', '👩', '🧑‍🎓', '👨‍🎓', '👩‍🎓'];
    
    let activityCounter = 0;
    
    function generateActivity() {
        const hostel = hostels[Math.floor(Math.random() * hostels.length)];
        const item = items[Math.floor(Math.random() * items.length)];
        const avatar = avatarEmojis[Math.floor(Math.random() * avatarEmojis.length)];
        
        const actions = [
            `Someone from <strong>${hostel}</strong> just ordered ${item}`,
            `<strong>${hostel}</strong> ordered ${item}`,
            `New order: ${item} to <strong>${hostel}</strong>`,
            `${item} being delivered to <strong>${hostel}</strong>`
        ];
        
        const action = actions[Math.floor(Math.random() * actions.length)];
        const timeAgo = Math.floor(Math.random() * 5) + 1;
        
        return {
            avatar,
            text: action,
            time: `${timeAgo} min ago`
        };
    }
    
    function addActivityToFeed(activity) {
        const feed = document.getElementById('activityFeed');
        if (!feed) return;
        
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        activityItem.innerHTML = `
            <div class="activity-avatar">${activity.avatar}</div>
            <div class="activity-content">
                <div class="activity-text">${activity.text}</div>
                <div class="activity-time">${activity.time}</div>
            </div>
        `;
        
        // Add to top of feed
        feed.insertBefore(activityItem, feed.firstChild);
        
        // Keep only last 6 activities
        while (feed.children.length > 6) {
            feed.removeChild(feed.lastChild);
        }
        
        activityCounter++;
    }
    
    // Initialize with some activities
    function initializeActivityFeed() {
        for (let i = 0; i < 4; i++) {
            const activity = generateActivity();
            activity.time = `${Math.floor(Math.random() * 15) + 1} min ago`;
            addActivityToFeed(activity);
        }
    }
    
    // Add new activity every 8-15 seconds
    function scheduleNextActivity() {
        const delay = Math.random() * 7000 + 8000; // 8-15 seconds
        setTimeout(() => {
            addActivityToFeed(generateActivity());
            scheduleNextActivity();
        }, delay);
    }
    
    // Start activity feed
    setTimeout(initializeActivityFeed, 1000);
    setTimeout(scheduleNextActivity, 10000);

    
    // ================================
    // DYNAMIC BUTTON GLOW EFFECT
    // ================================
    
    const ctaButton = document.querySelector('.btn-primary');
    
    if (ctaButton) {
        ctaButton.addEventListener('mousemove', (e) => {
            const rect = ctaButton.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ctaButton.style.setProperty('--mouse-x', `${x}px`);
            ctaButton.style.setProperty('--mouse-y', `${y}px`);
        });
    }

    
    // ================================
    // PARALLAX SCROLL EFFECT
    // ================================
    
    window.addEventListener('scroll', debounce(() => {
        const scrolled = window.pageYOffset;
        
        const moon = document.querySelector('.moon');
        const orbs = document.querySelectorAll('.glow-orb');
        
        if (moon) {
            moon.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
        
        orbs.forEach((orb, index) => {
            const speed = index === 0 ? 0.2 : 0.15;
            orb.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }, 10));

    
    // ================================
    // CARD HOVER TILT EFFECT
    // ================================
    
    const cards = document.querySelectorAll('.problem-card, .traffic-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    
    // ================================
    // CONSOLE EASTER EGG
    // ================================
    
    console.log(
        '%c🌙 Cravin ',
        'background: linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%); color: white; padding: 10px 20px; border-radius: 8px; font-size: 16px; font-weight: bold;'
    );
    console.log(
        '%cLate-night snacks for hostel students | Live and operating',
        'color: #a3a3a3; font-size: 12px;'
    );
    console.log(
        '%c' + trafficData.totalDeliveries + ' deliveries and counting 🚀',
        'color: #ff6b35; font-size: 14px; font-weight: bold;'
    );

});


// ================================
// UTILITY FUNCTIONS
// ================================

/**
 * Debounce function to limit execution rate
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Check if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

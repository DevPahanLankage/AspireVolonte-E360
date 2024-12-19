document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('courseModal');
    const closeBtn = modal.querySelector('.close-modal');
    const courseLinks = document.querySelectorAll('.course-cta');

    // Course data (you can move this to a separate JSON file later)
    const courseData = {
        'financial-planning': {
            title: 'Financial Planning Mastery',
            features: [
                { icon: 'fa-clock', text: '12 weeks course' },
                { icon: 'fa-video', text: '24 video lessons' },
                { icon: 'fa-certificate', text: 'Certificate included' }
            ],
            curriculum: [
                {
                    title: 'Module 1: Fundamentals',
                    lessons: ['Basic Concepts', 'Financial Goals', 'Risk Assessment']
                },
                {
                    title: 'Module 2: Investment Planning',
                    lessons: ['Asset Classes', 'Portfolio Management', 'Risk Management']
                }
            ]
        },
        // Add other course data here
    };

    // Open modal with course details
    courseLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const courseId = link.dataset.course;
            const course = courseData[courseId];
            
            if (course) {
                populateModal(course);
                modal.style.display = 'block';
            }
        });
    });

    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    function populateModal(course) {
        // Populate modal content with course data
        document.getElementById('modalTitle').textContent = course.title;
        
        // Populate features
        const featuresContainer = modal.querySelector('.course-features');
        featuresContainer.innerHTML = course.features.map(feature => `
            <div class="course-feature">
                <i class="fas ${feature.icon}"></i>
                <span>${feature.text}</span>
            </div>
        `).join('');

        // Populate curriculum
        const curriculumContainer = modal.querySelector('.course-curriculum');
        curriculumContainer.innerHTML = course.curriculum.map(module => `
            <div class="curriculum-section">
                <div class="curriculum-header">
                    <h4>${module.title}</h4>
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="curriculum-content">
                    ${module.lessons.map(lesson => `
                        <div class="lesson-item">
                            <i class="fas fa-play-circle"></i>
                            <span>${lesson}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }
}); 
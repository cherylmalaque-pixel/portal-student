document.addEventListener('DOMContentLoaded', function () {
    const loginView = document.getElementById('loginView');
    const portalView = document.getElementById('portalView');
    const loginForm = document.getElementById('loginForm');

    function enterPortal() {
        const enteredId = document.getElementById('loginStudentId').value.trim() || '2026-BSCRIM-014';
        document.getElementById('profileId').textContent = enteredId;
        document.getElementById('studentNumber').value = enteredId;
        document.getElementById('editIdInput').value = enteredId;

        loginView.classList.add('d-none');
        portalView.classList.remove('d-none');
        window.scrollTo(0, 0);
    }

    // Login Form Submit
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (loginForm.checkValidity()) {
            enterPortal();
        }
        loginForm.classList.add('was-validated');
    });

    // Quick Demo Login Button
    document.getElementById('btnQuickDemoLogin').addEventListener('click', enterPortal);

    // Logout Button
    document.getElementById('btnLogout').addEventListener('click', function () {
        portalView.classList.add('d-none');
        loginView.classList.remove('d-none');
        loginForm.classList.remove('was-validated');
    });

    // Dark / Light Theme Toggle
    document.getElementById('btnThemeToggle').addEventListener('click', function () {
        const htmlEl = document.documentElement;
        const isDark = htmlEl.getAttribute('data-bs-theme') === 'dark';
        htmlEl.setAttribute('data-bs-theme', isDark ? 'light' : 'dark');
        this.textContent = isDark ? 'Dark Mode' : 'Light Mode';
    });

    // Save Profile Modal
    document.getElementById('btnSaveProfile').addEventListener('click', function () {
        const name = document.getElementById('editNameInput').value.trim() || 'Gerald Canoy';
        const id = document.getElementById('editIdInput').value.trim() || '2026-BSCRIM-014';
        const course = document.getElementById('editCourseInput').value.trim() || 'BSCRIM (EDUC)';

        document.getElementById('headerStudentName').textContent = name;
        document.getElementById('profileName').textContent = name;
        document.getElementById('profileId').textContent = id;
        document.getElementById('profileCourse').textContent = course;
        document.getElementById('studentName').value = name;
        document.getElementById('studentNumber').value = id;
    });

    // Download Study Load
    document.getElementById('btnDownloadLoad').addEventListener('click', function () {
        const content = [
            'OFFICIAL STUDENT STUDY LOAD',
            '---------------------------',
            'Student Name: ' + document.getElementById('profileName').textContent,
            'Student ID:   ' + document.getElementById('profileId').textContent,
            'Program:      ' + document.getElementById('profileCourse').textContent,
            'Year Level:   ' + document.getElementById('profileYear').textContent,
            'Total Units:  ' + document.getElementById('profileUnits').textContent + ' Units',
            'Status:       ' + document.getElementById('enrollmentBadge').textContent
        ].join('\n');

        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Gerald_Canoy_BSCRIM_StudyLoad.txt';
        link.click();
        URL.revokeObjectURL(url);
    });

    // Mark Announcements Read & Add Note
    document.getElementById('btnMarkRead').addEventListener('click', function () {
        document.querySelectorAll('.announcement-item').forEach(el => {
            el.classList.remove('fw-semibold');
            el.classList.add('text-muted');
        });
        const badge = document.getElementById('unreadBadge');
        badge.className = 'badge bg-secondary ms-1';
        badge.textContent = '0 New';
        this.disabled = true;
        this.textContent = 'All Read';
    });

    document.getElementById('btnAddNotice').addEventListener('click', function () {
        const input = document.getElementById('newNoticeInput');
        const text = input.value.trim();
        if (text !== '') {
            const li = document.createElement('li');
            li.className = 'list-group-item px-0 announcement-item fw-semibold bg-transparent';
            li.textContent = 'Student Note: ' + text;
            document.getElementById('announcementList').appendChild(li);
            input.value = '';
        }
    });

    // Subject Syllabus & Enroll Toggles
    document.querySelectorAll('.btn-syllabus').forEach(btn => {
        btn.addEventListener('click', function () {
            document.getElementById('syllabusModalLabel').textContent = this.getAttribute('data-title');
            document.getElementById('syllabusDesc').textContent = this.getAttribute('data-desc');
            new bootstrap.Modal(document.getElementById('syllabusModal')).show();
        });
    });

    document.querySelectorAll('.btn-toggle-subject').forEach(btn => {
        let isEnrolled = true;
        btn.addEventListener('click', function () {
            const units = parseInt(this.getAttribute('data-units'), 10);
            const unitsDisplay = document.getElementById('profileUnits');
            const navUnits = document.getElementById('navUnitCount');
            let currentTotal = parseInt(unitsDisplay.textContent, 10);

            if (isEnrolled) {
                isEnrolled = false;
                this.classList.replace('btn-success', 'btn-outline-secondary');
                this.textContent = '+ Enroll Subject';
                currentTotal -= units;
            } else {
                isEnrolled = true;
                this.classList.replace('btn-outline-secondary', 'btn-success');
                this.textContent = 'Enrolled ✓';
                currentTotal += units;
            }
            unitsDisplay.textContent = currentTotal;
            navUnits.textContent = currentTotal;
        });
    });

    // Registration Form Submit & Reset
    const portalForm = document.getElementById('portalForm');
    portalForm.addEventListener('submit', function (event) {
        event.preventDefault();
        event.stopPropagation();

        if (portalForm.checkValidity()) {
            const name = document.getElementById('studentName').value.trim();
            const id = document.getElementById('studentNumber').value.trim();
            const course = document.getElementById('programCourse').value;
            const year = document.getElementById('yearLevel').value;
            const units = document.getElementById('profileUnits').textContent;

            document.getElementById('headerStudentName').textContent = name;
            document.getElementById('profileName').textContent = name;
            document.getElementById('profileId').textContent = id;
            document.getElementById('profileCourse').textContent = course;
            document.getElementById('profileYear').textContent = year;

            const badge = document.getElementById('enrollmentBadge');
            badge.className = 'badge text-bg-primary';
            badge.textContent = 'Officially Registered';

            document.getElementById('formAlertContainer').innerHTML = `
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>Registration Submitted!</strong> Student <strong>${name}</strong> (ID: ${id}) is now registered under <strong>${course} — ${year}</strong> with <strong>${units} units</strong>.
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`;
        }
        portalForm.classList.add('was-validated');
    });

    document.getElementById('btnResetForm').addEventListener('click', function () {
        portalForm.reset();
        portalForm.classList.remove('was-validated');
        document.getElementById('formAlertContainer').innerHTML = '';
    });
});
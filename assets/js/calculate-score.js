document.getElementById('scoreForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Function to get score from input field
    function getScore(id) {
        return parseFloat(document.getElementById(id).value) || 0;
    }

    // Function to calculate average score for subjects
    function calculateAverageScore(subject) {
        const score10 = getScore(subject + '10');
        const score11 = getScore(subject + '11');
        const score12 = getScore(subject + '12');
        return (score10 + score11 + score12) / 3;
    }

    // Subjects and their display names
    const subjects = {
        'math': 'Toán học (Cả năm)',
        'phy': 'Vật lý (Cả năm)',
        'chem': 'Hóa học (Cả năm)',
        'bio': 'Sinh học (Cả năm)',
        'lit': 'Ngữ văn (Cả năm)',
        'hist': 'Lịch sử (Cả năm)',
        'geo': 'Địa lý (Cả năm)',
        'lang': 'Ngoại ngữ (Cả năm)',
        'gdcd': 'GDCD (Cả năm)'
    };

    // Calculate average scores for all subjects
    let averageScores = {};
    for (const subject in subjects) {
        averageScores[subject] = calculateAverageScore(subject);
    }

    // Generate HTML for results
    let resultsHTML = '';
    const subjectKeys = Object.keys(subjects);
    for (let i = 0; i < subjectKeys.length; i += 4) {
        resultsHTML += '<div class="results-row">';
        for (let j = 0; j < 4 && i + j < subjectKeys.length; j++) {
            const subject = subjectKeys[i + j];
            const averageScore = averageScores[subject];
            resultsHTML += `
                <div class="input-group">
                    <label>${subjects[subject]}</label>
                    <input type="text" value="${averageScore.toFixed(2)} điểm" readonly>
                </div>
            `;
        }
        resultsHTML += '</div>';
    }

    // Display results
    document.getElementById('resultsTable').innerHTML = resultsHTML;
    document.getElementById('results').style.display = 'block';

    // Calculate priority points
    const kvutScore = parseFloat(document.querySelector('#optionsKVUT option:checked').getAttribute('data-score')) || 0;
    const dtutScore = parseFloat(document.querySelector('#optionsDTUT option:checked').getAttribute('data-score')) || 0;
    const icsScore = parseFloat(document.querySelector('#optionsICS option:checked').getAttribute('data-score')) || 0;

    // Define blocks and their subject combinations
    const blocks = {
        'A00': ['math', 'phy', 'chem'],
        'A00(Toán hệ số 2)': ['math', 'phy', 'chem', 'math'],
        'A01': ['math', 'phy', 'lang'],
        'A01(Toán hệ số 2)': ['math', 'phy', 'lang', 'math'],
        'A01(Ngoại ngữ hệ số 2)': ['math', 'phy', 'lang', 'lang'],
        'A02': ['math', 'phy', 'bio'],
        'B00': ['math', 'chem', 'bio'],
        'C00': ['lit', 'hist', 'geo'],
        'C01': ['lit', 'math', 'phy'],
        'C02': ['lit', 'math', 'chem'],
        'C03': ['lit', 'math', 'hist'],
        'D01': ['lit', 'math', 'lang'],
        'D01(Toán hệ số 2)': ['lit', 'math', 'lang', 'math'],
        'D01(Ngoại ngữ hệ số 2)': ['lit', 'math', 'lang', 'lang'],
        'D08': ['math', 'lang', 'bio'],
        'D14': ['lit', 'math', 'hist'],
        'D14(Ngoại ngữ hệ số 2)': ['lit', 'math', 'hist', 'lang'],
        'D15': ['math', 'chem', 'lang'],
        'D78': ['math', 'lang', 'bio'],
        'D78(Ngoại ngữ hệ số 2)': ['math', 'lang', 'bio', 'lang'],
        'D90': ['math', 'phy', 'lang'],
        'D96': ['lit', 'math', 'lang'],
        'D96(Ngoại ngữ hệ số 2)': ['lit', 'math', 'lang', 'lang']
    };

    // Calculate block scores and generate HTML
    let blockResultsHTML = '';
    for (const [block, subjects] of Object.entries(blocks)) {
        let totalScore = 0;
        let numSubjects = 0;

        for (const subject of subjects) {
            const averageScore = averageScores[subject];
            totalScore += averageScore;
            numSubjects++;
        }

        // Adjust score if there are subjects with weight of 2
        if (block.includes('hệ số 2')) {
            totalScore = (totalScore / numSubjects) * 3;
        } else {
            totalScore = totalScore / numSubjects * 3;
        }

        // Calculate priority points based on total score
        let priorityPoints = 0;
        if (totalScore < 22.5) {
            priorityPoints = kvutScore + dtutScore;
        } else {
            priorityPoints = ((30 - totalScore) / 7.5) * (kvutScore + dtutScore);
        }

        // Calculate final score including icsScore
        const finalScore = totalScore + priorityPoints + icsScore;

        // Generate HTML for block results
        blockResultsHTML += `
            <div class="input-group">
                <label>Khối ${block}</label>
                <input type="text" value="${finalScore.toFixed(2)} điểm" readonly>
            </div>
        `;
    }

    // Display block results
    document.getElementById('blockResultsTable').innerHTML = blockResultsHTML;
    document.getElementById('blockResults').style.display = 'block';
    document.getElementById('couserResults').style.display = 'block';
    
});
document.addEventListener('DOMContentLoaded', function() {
    // Dữ liệu bảng
    const data = [
        ['Đại trà', '7760101', 'Công Tác Xã Hội', 30, 'Văn, Sử, Địa (C00)', 'Không có môn hệ số 2', 'Nhấn vào đây'],
        ['Đại trà', '7760101', 'Công Tác Xã Hội', 30, 'Toán, Lý, Anh (A01)', 'Không có môn hệ số 2', 'Nhấn vào đây'],
        ['Đại trà', '7760101', 'Công Tác Xã Hội', 30, 'Toán, Văn, Ngoại Ngữ (D01-D06, DD2)', 'Không có môn hệ số 2', 'Nhấn vào đây'],
        ['Đại trà', '7760101', 'Công Tác Xã Hội', 30, 'Văn, KHXH, Ngoại Ngữ (D78-D83, DH8)', 'Không có môn hệ số 2', 'Nhấn vào đây'],
        ['Đại trà', '7310401', 'Tâm lý học', 30, 'Văn, Sử, Địa (C00)', 'Không có môn hệ số 2', 'Nhấn vào đây'],
        ['Đại trà', '7310401', 'Tâm lý học', 30, 'Toán, Lý, Anh (A01)', 'Không có môn hệ số 2', 'Nhấn vào đây'],
        ['Đại trà', '7310401', 'Tâm lý học', 30, 'Toán, Văn, Ngoại Ngữ (D01-D06, DD2)', 'Không có môn hệ số 2', 'Nhấn vào đây'],
        ['Đại trà', '7310401', 'Tâm lý học', 30, 'Văn, KHXH, Ngoại Ngữ (D78-D83, DH8)', 'Không có môn hệ số 2', 'Nhấn vào đây'],
        ['Đại trà', '7810101', 'Du Lịch', 30, 'Toán, Lý, Hóa (A00)', 'Không có môn hệ số 2', 'Nhấn vào đây'],
        ['Đại trà', '7810101', 'Du Lịch', 30, 'Toán, Lý, Anh (A01)', 'Không có môn hệ số 2', 'Nhấn vào đây']
    ];

    // Pagination
    const rowsPerPage = 5;
    let currentPage = 1;

    // Create table
    function createTable(data) {
        let tableHTML = `
            <table border="1">
                <thead>
                    <tr>
                        <th>Loại</th>
                        <th>Mã Ngành</th>
                        <th>Tên Ngành</th>
                        <th>Điểm</th>
                        <th>Khối Thi</th>
                        <th>Ghi Chú</th>
                        <th>Thao Tác</th>
                    </tr>
                </thead>
                <tbody>
        `;

        data.forEach(row => {
            tableHTML += `
                <tr>
                    <td>${row[0]}</td>
                    <td>${row[1]}</td>
                    <td>${row[2]}</td>
                    <td>${row[3]}</td>
                    <td>${row[4]}</td>
                    <td>${row[5]}</td>
                    <td><a href="#">${row[6]}</a></td>
                </tr>
            `;
        });

        tableHTML += `
                </tbody>
            </table>
        `;

        return tableHTML;
    }

    // Display table with pagination
    function displayTable(page, dataToDisplay) {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const paginatedData = dataToDisplay.slice(start, end);
        document.getElementById('resultsContainer').innerHTML = createTable(paginatedData);
        document.getElementById('prevPage').classList.toggle('disabled', page === 1);
        document.getElementById('nextPage').classList.toggle('disabled', end >= dataToDisplay.length);
    }

    // Search and pagination
    function filterTable() {
        const query = document.getElementById('searchInput').value.toLowerCase();
        const filteredData = data.filter(row =>
            row.some(cell => cell.toString().toLowerCase().includes(query))
        );
        currentPage = 1; // Reset to first page when filtering
        displayTable(currentPage, filteredData);
    }

    // Pagination Navigation
    document.getElementById('prevPage').addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            displayTable(currentPage, data.filter(row =>
                row.some(cell => cell.toString().toLowerCase().includes(document.getElementById('searchInput').value.toLowerCase()))
            ));
        }
    });

    document.getElementById('nextPage').addEventListener('click', function() {
        const filteredData = data.filter(row =>
            row.some(cell => cell.toString().toLowerCase().includes(document.getElementById('searchInput').value.toLowerCase()))
        );
        if ((currentPage * rowsPerPage) < filteredData.length) {
            currentPage++;
            displayTable(currentPage, filteredData);
        }
    });

    document.getElementById('searchInput').addEventListener('input', filterTable);

    // Show table for first time
    displayTable(currentPage, data);
});
// Clear all input fields when the page loads
window.addEventListener('DOMContentLoaded', (event) => {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.value = ''; // Clear input value
    });
});

// Function to create a toast notification
function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toastContainer');
    
    // Create toast element
    const toast = document.createElement('div');
    toast.classList.add('toast', type);
    
    // Add content with an "X" button and icon
    toast.innerHTML = `
        <div class="toast-status-icon">
            <i class='bx bxs-error'></i> <!-- Icon before the message -->
        </div>
        <div class="toast-content">
            <p>${message}</p>
        </div>
        <button class="toast-close">&times;</button> <!-- Close button -->
        <div class="toast-duration"></div>
    `;
    
    // Append toast to container
    toastContainer.appendChild(toast);
    
    // Close the toast when the close button is clicked
    toast.querySelector('.toast-close').addEventListener('click', function() {
        toast.remove();
    });

    // Automatically remove toast after 5 seconds
    setTimeout(() => {
        toast.remove();
    }, 5000);
}

// Function to check the value of input
function validateScoreInput(input) {
    const value = input.value;
    if (isNaN(value) || value === '') {
        showToast("Chỉ được nhập số!", "error");
        input.value = ''; 
    } else {
        const numValue = parseFloat(value);
        if (numValue < 0 || numValue > 10) {
            showToast("Điểm phải từ 0 đến 10!", "error");
            input.value = ''; 
        }
    }
}

// Get all text inputs in the form with id 'scoreForm'
document.querySelectorAll('#scoreForm input[type="text"]').forEach(input => {
    input.addEventListener('input', function() {
        validateScoreInput(this);
    });
});


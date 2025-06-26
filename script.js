export function calculateApprovedStudents() {
    // Get values from input fields, default to 0 if empty
    const totalStudents = parseInt(document.getElementById('totalStudents').value || '0');
    const femaleStudents = parseInt(document.getElementById('femaleStudents').value || '0');
    const maleStudents = parseInt(document.getElementById('maleStudents').value || '0');
    const femaleFailedStudents = parseInt(document.getElementById('femaleFailedStudents').value || '0');
    const maleFailedStudents = parseInt(document.getElementById('maleFailedStudents').value || '0');

    let errorMessage = '';

    if (isNaN(totalStudents) || isNaN(femaleStudents) || isNaN(maleStudents) || isNaN(femaleFailedStudents) || isNaN(maleFailedStudents)) {
        errorMessage = "Por favor, ingrese números válidos en todos los campos.";
    } else if ((femaleStudents + maleStudents) > totalStudents) {
        errorMessage = "Error: La suma de alumnos femeninos y masculinos no puede ser más que el total de alumnos.";
    } else if (femaleStudents < 0 || maleStudents < 0 || femaleFailedStudents < 0 || maleFailedStudents < 0) {
        errorMessage = "Error: Los valores no pueden ser negativos.";
    } else if (femaleFailedStudents > femaleStudents) {
        errorMessage = "Error: Femeninos reprobados no puede ser mayor que el total de femeninos.";
    } else if (maleFailedStudents > maleStudents) {
        errorMessage = "Error: Masculinos reprobados no puede ser mayor que el total de masculinos.";
    } else if ((femaleFailedStudents + maleFailedStudents) > totalStudents) {
         errorMessage = "Error: El total de reprobados no puede ser mayor que el total de alumnos.";
    }

    if (errorMessage) {
        alert(errorMessage);
        return;
    }
    
    const totalFailedStudents = femaleFailedStudents + maleFailedStudents;
    const approvedStudents = totalStudents - totalFailedStudents;
    const femaleApprovedStudents = femaleStudents - femaleFailedStudents;
    const maleApprovedStudents = maleStudents - maleFailedStudents;

    let percentageApproved = 0;
    let percentageFailed = 0;

    if (totalStudents > 0) {
        percentageApproved = (approvedStudents / totalStudents) * 100;
        percentageFailed = (totalFailedStudents / totalStudents) * 100;
    }
    
    const printContent = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Resultados de Cálculo</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 20px;
                    background-color: #e0f2f7; 
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 90vh; 
                    color: #333;
                }
                .print-window-container {
                    background-color: #ADD8E6; 
                    padding: 30px;
                    border-radius: 8px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                    max-width: 500px;
                    width: 100%;
                    text-align: center;
                }
                .print-window-container h2 {
                    color: #007bff;
                    margin-bottom: 25px;
                    font-size: 20px;
                }
                .print-window-container p {
                    font-size: 16px; 
                    margin: 10px 0; 
                    line-height: 1.5;
                    display: flex; 
                    justify-content: space-between; 
                    align-items: baseline; 
                }
                .print-window-container p strong {
                    font-weight: bold;
                    color: black; 
                    margin-right: 15px; 
                    flex-shrink: 0; 
                }
                .print-window-container p span.value { 
                    text-align: right; 
                    flex-grow: 1; 
                }
                .print-window-close-button {
                    background-color: #000080; 
                    color: white;
                    padding: 12px 25px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 18px;
                    margin-top: 25px; 
                    transition: background-color 0.3s ease;
                }
                .print-window-close-button:hover {
                    background-color: #c82333;
                }
                /* New styles for approved/reprobated values and labels */
                .approved-value {
                    color: #28a745; 
                    font-weight: bold;
                }
                .failed-value {
                    color: #dc3545; 
                    font-weight: bold;
                }
                /* Styles for separating sections */
                .results-section {
                    margin-bottom: 30px;
                    border: 2px solid; 
                    padding: 20px;
                    border-radius: 5px;
                    background-color: white; 
                }
                .results-section h3 {
                    margin-top: 0;
                    margin-bottom: 15px;
                    font-size: 20px;
                    color: #333;
                    border-bottom: 1px solid #eee;
                    padding-bottom: 10px;
                }

                /* Print-specific styles for single page output */
                @media print {
                    body {
                        margin: 0 !important;
                        padding: 0 !important;
                        display: block !important; /* Override flex for print */
                        min-height: auto !important; /* Override min-height for print */
                        background-color: white !important; /* Ensure white background for print */
                        color: #000 !important; /* Ensure black text for print clarity */
                        -webkit-print-color-adjust: exact; /* Force printing of background colors */
                        print-color-adjust: exact;
                    }
                    @page {
                        margin: 0.5in !important; /* Smaller margins for print */
                    }
                    .print-window-container {
                        box-shadow: none !important; /* Remove shadow when printing */
                        max-width: none !important; /* Allow container to fill page width */
                        width: auto !important;
                        padding: 15px !important; /* Slightly reduce padding for print */
                        margin: 0 auto !important; /* Center on page, but let @page margins control overall layout */
                        background-color: #ADD8E6 !important; /* Ensure background prints */
                    }
                    .results-section {
                        border-width: 1px !important; /* Thinner border for print */
                        padding: 10px !important; /* Reduce padding for print */
                        background-color: white !important; /* Ensure background prints */
                    }
                    /* Ensure colors from approved/failed values print */
                    .approved-value {
                        color: #28a745 !important;
                    }
                    .failed-value {
                        color: #dc3545 !important;
                    }
                }
            </style>
        </head>
        <body>
            <div class="print-window-container">
                
                <div class="results-section" style="border-color: #28a745;">
                    <h3 style="color: #28a745;">Aprobados</h3>
                    <p><strong class="approved-value">Femeninos:</strong> <span class="value approved-value">${femaleApprovedStudents}</span></p>
                    <p><strong class="approved-value">Masculinos:</strong> <span class="value approved-value">${maleApprovedStudents}</span></p>
                    <p><strong class="approved-value">Total:</strong> <span class="value approved-value">${approvedStudents}</span></p>
                    <p><strong class="approved-value">Porcentaje:</strong> <span class="value approved-value">${percentageApproved.toFixed(2)}%</span></p>
                </div>

                <div class="results-section" style="border-color: #dc3545;">
                    <h3 style="color: #dc3545;">Reprobados</h3>
                    <p><strong class="failed-value">Femeninos:</strong> <span class="value failed-value">${femaleFailedStudents}</span></p>
                    <p><strong class="failed-value">Masculinos:</strong> <span class="value failed-value">${maleFailedStudents}</span></p>
                    <p><strong class="failed-value">Total:</strong> <span class="value failed-value">${totalFailedStudents}</span></p>
                    <p><strong class="failed-value">Porcentaje:</strong> <span class="value failed-value">${percentageFailed.toFixed(2)}%</span></p>
                </div>
                
            </div>
        </body>
        </html>
    `;

    const newWindow = window.open('', '_blank', 'width=600,height=700,resizable,scrollbars');
    if (newWindow) {
        newWindow.document.write(printContent);
        newWindow.document.close(); 
        newWindow.print(); // Trigger the print dialog for the new window
    } else {
        alert("Por favor, permita las ventanas emergentes para ver los resultados.");
    }
}
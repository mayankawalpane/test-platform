import { useState, useEffect } from 'react'
import './TechnicalAssessment.css'

const questions = [
  // Section 1: Common Applications & MS Office (Questions 1-5)
  {
    id: 1,
    question: "You are working on an Excel spreadsheet with 10,000 rows of sales data. You need to find the total sales for a specific product category. Which Excel feature would be most efficient?",
    options: ["Manual calculation", "SUMIF function", "VLOOKUP", "Conditional Formatting"],
    correct: 1,
    category: "MS Office"
  },
  {
    id: 2,
    question: "In MS Word, you want to create a mail merge to send personalized letters to 500 clients. Which data source format is NOT supported by Mail Merge?",
    options: ["Excel spreadsheet", "Access database", "PDF file", "Outlook contacts"],
    correct: 2,
    category: "MS Office"
  },
  {
    id: 3,
    question: "Your manager asks you to protect an Excel workbook so that only specific users can make changes. Which feature should you use?",
    options: ["Password to open", "Protect Sheet", "Protect Workbook with password", "Share Workbook"],
    correct: 2,
    category: "MS Office"
  },
  {
    id: 4,
    question: "In MS PowerPoint, you want to create a presentation that automatically plays without manual intervention at a kiosk. Which setup option should you choose?",
    options: ["Set Up Show → Browsed at a kiosk", "Set Up Show → Presented by a speaker", "Set Up Show → Browsed by an individual", "Custom Show"],
    correct: 0,
    category: "MS Office"
  },
  {
    id: 5,
    question: "You receive an Excel file where numbers are stored as text and cannot be summed. What is the quickest way to convert them to numbers?",
    options: ["Format Cells → Number", "Text to Columns feature", "Use VALUE function", "Multiply all cells by 1 using Paste Special"],
    correct: 3,
    category: "MS Office"
  },
  
  // Section 2: Pseudocode (Questions 6-12)
  {
    id: 6,
    question: "What will be the output of this pseudocode?\n\nBEGIN\n    SET a = 10\n    SET b = 20\n    SWAP a, b\n    PRINT a, b\nEND",
    options: ["10 20", "20 10", "10 10", "Error"],
    correct: 1,
    category: "Pseudocode"
  },
  {
    id: 7,
    question: "Consider a binary search algorithm. What is the time complexity of this algorithm?",
    options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
    correct: 1,
    category: "Pseudocode"
  },
  {
    id: 8,
    question: "What will be the output of the following pseudocode?\n\nBEGIN\n    SET num = 7\n    SET factorial = 1\n    FOR i = 1 TO num\n        factorial = factorial * i\n    NEXT i\n    PRINT factorial\nEND",
    options: ["120", "5040", "720", "40320"],
    correct: 1,
    category: "Pseudocode"
  },
  {
    id: 9,
    question: "Identify the logical error in this pseudocode that finds the largest number in an array:\n\nBEGIN\n    SET max = 0\n    FOR i = 1 TO n\n        IF arr[i] > max THEN\n            max = arr[i]\n        ENDIF\n    NEXT i\n    PRINT max\nEND",
    options: ["max should be initialized to arr[0]", "Loop should start from 0", "Both A and B are correct", "No error"],
    correct: 2,
    category: "Pseudocode"
  },
  {
    id: 10,
    question: "What will be the output?\n\nBEGIN\n    SET x = 0\n    WHILE x < 10 DO\n        x = x + 1\n        IF x == 5 THEN\n            CONTINUE\n        ENDIF\n        PRINT x\n    ENDWHILE\nEND",
    options: ["1 2 3 4 5 6 7 8 9 10", "1 2 3 4 6 7 8 9 10", "1 2 3 4 5 6 7 8 9", "Infinite loop"],
    correct: 1,
    category: "Pseudocode"
  },
  {
    id: 11,
    question: "Which pseudocode correctly implements a stack (LIFO) operation?",
    options: ["Push: add to front, Pop: remove from front", "Push: add to end, Pop: remove from end", "Push: add to front, Pop: remove from end", "Push: add to end, Pop: remove from front"],
    correct: 1,
    category: "Pseudocode"
  },
  {
    id: 12,
    question: "What is the output of this recursion pseudocode?\n\nFUNCTION fib(n)\n    IF n <= 1 THEN\n        RETURN n\n    ELSE\n        RETURN fib(n-1) + fib(n-2)\n    ENDIF\nENDFUNCTION\n\nPRINT fib(6)",
    options: ["5", "8", "13", "21"],
    correct: 1,
    category: "Pseudocode"
  },
  
  // Section 3: Networking Fundamentals (Questions 13-19)
  {
    id: 13,
    question: "A network administrator is troubleshooting connectivity issues. A user can ping the gateway (192.168.1.1) but cannot access the internet. What is the most likely cause?",
    options: ["DNS server issue", "Switch failure", "Cable disconnection", "Incorrect subnet mask"],
    correct: 0,
    category: "Networking"
  },
  {
    id: 14,
    question: "Your organization uses the IP range 10.0.0.0/8. How many usable host addresses are available?",
    options: ["254", "65,534", "16,777,214", "2,097,150"],
    correct: 2,
    category: "Networking"
  },
  {
    id: 15,
    question: "A company has 4 departments with 60 employees each. They need to create separate subnets while minimizing IP wastage. Which subnet mask would you recommend?",
    options: ["/24", "/25", "/26", "/27"],
    correct: 2,
    category: "Networking"
  },
  {
    id: 16,
    question: "Which of the following is NOT a valid MAC address?",
    options: ["00:1A:2B:3C:4D:5E", "00-1A-2B-3C-4D-5E", "001A.2B3C.4D5E", "192.168.1.1"],
    correct: 3,
    category: "Networking"
  },
  {
    id: 17,
    question: "During a network diagnostic, you discover excessive collisions on a network. What is the best solution?",
    options: ["Replace the hub with a switch", "Increase the cable length", "Add more hubs", "Use fiber optic cables"],
    correct: 0,
    category: "Networking"
  },
  {
    id: 18,
    question: "Which protocol is used for sending email from a client to a mail server?",
    options: ["POP3", "IMAP", "SMTP", "HTTP"],
    correct: 2,
    category: "Networking"
  },
  {
    id: 19,
    question: "A remote employee cannot access the company's internal server. The VPN connection is successful, but internal website doesn't load. What's the most likely issue?",
    options: ["DNS resolution for internal domain", "Firewall blocking the VPN", "Router malfunction", "ISP outage"],
    correct: 0,
    category: "Networking"
  },
  
  // Section 4: Cloud Computing (Questions 20-24)
  {
    id: 20,
    question: "A startup wants to launch a web application with unpredictable traffic. They want to pay only for what they use. Which cloud pricing model is most suitable?",
    options: ["Reserved Instances", "Spot Instances", "Pay-as-you-go", "Dedicated Hosts"],
    correct: 2,
    category: "Cloud"
  },
  {
    id: 21,
    question: "Which of the following is a benefit of serverless computing?",
    options: ["No server management", "Always-on servers", "Fixed pricing", "Manual scaling"],
    correct: 0,
    category: "Cloud"
  },
  {
    id: 22,
    question: "Your company has on-premise data center and uses public cloud for burst capacity. What cloud deployment model is this?",
    options: ["Public Cloud", "Private Cloud", "Hybrid Cloud", "Multi-Cloud"],
    correct: 2,
    category: "Cloud"
  },
  {
    id: 23,
    question: "Which AWS service is used for object storage?",
    options: ["EC2", "S3", "RDS", "Lambda"],
    correct: 1,
    category: "Cloud"
  },
  {
    id: 24,
    question: "What does 'Elasticity' mean in cloud computing?",
    options: ["Ability to recover from failure", "Ability to scale resources up and down automatically", "Ability to distribute traffic", "Ability to secure data"],
    correct: 1,
    category: "Cloud"
  },
  
  // Section 5: Operating Systems (Questions 25-29)
  {
    id: 25,
    question: "A user reports that their computer is running very slowly. Task Manager shows high memory usage. What is the best troubleshooting step?",
    options: ["Check for malware", "Add more RAM", "Close unnecessary applications", "Restart the computer"],
    correct: 2,
    category: "Operating Systems"
  },
  {
    id: 26,
    question: "Which scheduling algorithm ensures that each process gets equal CPU time?",
    options: ["First Come First Served", "Shortest Job First", "Round Robin", "Priority Scheduling"],
    correct: 2,
    category: "Operating Systems"
  },
  {
    id: 27,
    question: "What is the difference between a process and a thread?",
    options: ["Threads share memory, processes don't", "Processes share memory, threads don't", "Both are the same", "Threads have priority over processes"],
    correct: 0,
    category: "Operating Systems"
  },
  {
    id: 28,
    question: "A system has 4 GB of RAM and runs multiple applications. The user opens a 5 GB file. What will the operating system do?",
    options: ["Crash the system", "Use virtual memory (paging)", "Deny opening the file", "Compress the file"],
    correct: 1,
    category: "Operating Systems"
  },
  {
    id: 29,
    question: "Which type of file system is commonly used in Windows operating systems?",
    options: ["ext4", "FAT32", "NTFS", "HFS+"],
    correct: 2,
    category: "Operating Systems"
  },
  
  // Section 6: SQL & Database (Questions 30-35)
  {
    id: 30,
    question: "You have two tables: Employees (EmpID, Name, DeptID) and Departments (DeptID, DeptName). Write a query to get all employees along with their department names, including employees without a department.",
    options: ["SELECT * FROM Employees INNER JOIN Departments", "SELECT * FROM Employees LEFT JOIN Departments", "SELECT * FROM Employees RIGHT JOIN Departments", "SELECT * FROM Employees FULL JOIN Departments"],
    correct: 1,
    category: "SQL"
  },
  {
    id: 31,
    question: "What will be the result of this SQL query?\n\nSELECT COUNT(*) FROM Employees\nWHERE Salary > (SELECT AVG(Salary) FROM Employees)",
    options: ["Number of employees with salary greater than average", "Number of employees with salary less than average", "Total number of employees", "Average of salaries"],
    correct: 0,
    category: "SQL"
  },
  {
    id: 32,
    question: "Which normalization form eliminates transitive dependency?",
    options: ["1NF", "2NF", "3NF", "BCNF"],
    correct: 2,
    category: "SQL"
  },
  {
    id: 33,
    question: "Your database is experiencing slow query performance. The query joins 5 tables and uses multiple WHERE conditions. What would be the most effective optimization?",
    options: ["Add appropriate indexes", "Reduce table size", "Use subqueries instead of joins", "Increase server memory"],
    correct: 0,
    category: "SQL"
  },
  {
    id: 34,
    question: "Which SQL clause is used to filter groups created by GROUP BY?",
    options: ["WHERE", "HAVING", "ORDER BY", "FILTER"],
    correct: 1,
    category: "SQL"
  },
  {
    id: 35,
    question: "What is the output of this SQL query?\n\nSELECT DeptID, COUNT(*)\nFROM Employees\nGROUP BY DeptID\nHAVING COUNT(*) > 5",
    options: ["Departments with more than 5 employees", "Employees in each department", "Departments with exactly 5 employees", "Employees with salary > 5"],
    correct: 0,
    category: "SQL"
  },
  
  // Section 7: Security Fundamentals (Questions 36-40)
  {
    id: 36,
    question: "An employee receives an email with an attachment from an unknown sender. The email urges immediate action. What is this type of attack called?",
    options: ["Phishing", "Spear Phishing", "Vishing", "Whaling"],
    correct: 0,
    category: "Security"
  },
  {
    id: 37,
    question: "A company stores customer credit card information. The security team wants to ensure that even if the database is compromised, the card numbers remain protected. What is the best approach?",
    options: ["Data Encryption at rest", "Data Masking", "Tokenization", "All of the above"],
    correct: 3,
    category: "Security"
  },
  {
    id: 38,
    question: "Which type of attack involves intercepting communication between two parties?",
    options: ["Denial of Service", "Man-in-the-Middle", "SQL Injection", "Cross-Site Scripting"],
    correct: 1,
    category: "Security"
  },
  {
    id: 39,
    question: "What is the primary purpose of a SIEM (Security Information and Event Management) system?",
    options: ["Block malware", "Collect and analyze security logs", "Encrypt data", "Manage user passwords"],
    correct: 1,
    category: "Security"
  },
  {
    id: 40,
    question: "Which of the following is NOT a principle of the CIA triad?",
    options: ["Confidentiality", "Integrity", "Availability", "Accountability"],
    correct: 3,
    category: "Security"
  },
  
  // Section 8: Basic Programming Concepts (Questions 41-45)
  {
    id: 41,
    question: "What is the output of this Java code?\n\nint x = 5;\nSystem.out.println(x++);\nSystem.out.println(++x);",
    options: ["5, 7", "5, 6", "6, 7", "6, 6"],
    correct: 0,
    category: "Programming"
  },
  {
    id: 42,
    question: "Which data structure uses LIFO (Last In First Out) principle?",
    options: ["Queue", "Stack", "Linked List", "Array"],
    correct: 1,
    category: "Programming"
  },
  {
    id: 43,
    question: "What is the output of this Python code?\n\ndef func(a, b=[]):\n    b.append(a)\n    return b\n\nprint(func(1))\nprint(func(2))",
    options: ["[1], [1]", "[1], [2]", "[1], [1, 2]", "Error"],
    correct: 2,
    category: "Programming"
  },
  {
    id: 44,
    question: "Which of the following is NOT an object-oriented programming principle?",
    options: ["Encapsulation", "Inheritance", "Polymorphism", "Recursion"],
    correct: 3,
    category: "Programming"
  },
  {
    id: 45,
    question: "What is the output of this C++ code snippet?\n\nint arr[] = {1, 2, 3, 4, 5};\ncout << sizeof(arr)/sizeof(arr[0]);",
    options: ["5", "10", "20", "Error"],
    correct: 0,
    category: "Programming"
  }
]

function TechnicalAssessment({ onComplete, isLastSection }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(45 * 60) // 45 minutes
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          handleSubmit()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleAnswer = (questionId, answerIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answerIndex
    })
  }

  const handleSubmit = () => {
    setShowResults(true)
  }

  const calculateScore = () => {
    let correct = 0
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correct) {
        correct++
      }
    })
    return correct
  }

  if (showResults) {
    const score = calculateScore()
    const percentage = ((score / questions.length) * 100).toFixed(1)
    const passed = percentage >= 60

    // Pass results to parent
    setTimeout(() => {
      onComplete({
        score: score,
        total: questions.length,
        percentage: percentage,
        passed: passed
      })
    }, 100)

    return (
      <div className="assessment-container">
        <div className="assessment-header">
          <h2>Technical Assessment - Results</h2>
        </div>
        <div className="results-container">
          <div className={`results-card ${passed ? 'passed' : 'failed'}`}>
            <h1>{passed ? '✓ Passed' : '✗ Not Passed'}</h1>
            <div className="score-display">
              <span className="score-large">{score}/{questions.length}</span>
              <span className="percentage">{percentage}%</span>
            </div>
            <p className="result-message">
              {passed 
                ? 'Congratulations! You have passed the technical assessment. Please proceed to the next section.'
                : 'Unfortunately, you did not pass this assessment. You need at least 60% to proceed.'}
            </p>
            {passed && (
              <button className="continue-btn" onClick={onComplete}>
                {isLastSection ? 'Complete Test' : 'Continue to Next Assessment'}
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]

  return (
    <div className="assessment-container">
      <div className="assessment-header">
        <h2>Technical Assessment</h2>
        <div className="header-info">
          <span className="timer">⏱ {formatTime(timeLeft)}</span>
          <span className="question-counter">{currentQuestion + 1} / {questions.length}</span>
        </div>
      </div>

      <div className="assessment-content">
        <div className="question-card">
          <div className="question-header">
            <span className="category-badge">{question.category}</span>
            <span className="question-number">Question {currentQuestion + 1}</span>
          </div>
          
          <h3 className="question-text">{question.question}</h3>

          <div className="options-list">
            {question.options.map((option, index) => (
              <div
                key={index}
                className={`option-item ${selectedAnswers[question.id] === index ? 'selected' : ''}`}
                onClick={() => handleAnswer(question.id, index)}
              >
                <div className="option-radio">
                  {selectedAnswers[question.id] === index && <div className="radio-dot" />}
                </div>
                <span className="option-text">{option}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="navigation-buttons">
          <button
            className="nav-btn"
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
          >
            ← Previous
          </button>
          
          {currentQuestion < questions.length - 1 ? (
            <button
              className="nav-btn primary"
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
            >
              Next →
            </button>
          ) : (
            <button className="nav-btn submit" onClick={handleSubmit}>
              Submit Test
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default TechnicalAssessment

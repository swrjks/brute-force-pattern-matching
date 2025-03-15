document.addEventListener("DOMContentLoaded", function () {
    const userTerminalBody = document.getElementById("user-terminal-body");
    const mainTerminalBody = document.getElementById("main-terminal-body");

    function appendPrompt() {
        const promptLine = document.createElement("div");
        promptLine.classList.add("terminal-line");
        promptLine.innerHTML = `<span class="prompt">ubuntu@tecmint:~ $</span> <span class="input" contenteditable="true"></span>`;
        userTerminalBody.appendChild(promptLine);

        const inputSpan = promptLine.querySelector(".input");
        inputSpan.focus();

        inputSpan.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                processCommand(inputSpan.innerText.trim());
                inputSpan.removeAttribute("contenteditable"); // Lock input
                
                appendPrompt(); // New prompt
            }
        });
    }

    function processCommand(command) {
        if (command === "/clear") {
            userTerminalBody.innerHTML = ""; // Clear terminal
            displayHelp();
        } else if (command === "/ls") {
            addOutput("Python\nC\nJava");
        } else if (command === "/python") {
            addOutput("Displaying Python code...");
            typewriterEffect("python");
        } else if (command === "/c") {
            addOutput("Displaying C code...");
            typewriterEffect("c");
        } else if (command === "/java") {
            addOutput("Displaying Java code...");
            typewriterEffect("java");
        } else if (command === "/info") {
            displayInfoTable(); // Display user info in table format
        } else if (command !== "") {
            addOutput("Command not found: " + command);
        }
    }

    function displayInfoTable() {
        const infoTable = `
_____________________________________________
| Field       | Value                       |
|-------------|-----------------------------|
| Name        | Swaraj Kumar Sahu           |
| Batch       | 2023-2027                   |
| Stream      | CSE                         |
| Date        | 02-03-2025                  |
| GitHub Link | github.com/swrjks           |
|___________________________________________|`;
    
        const preElement = document.createElement("pre");
        preElement.classList.add("terminal-output");
        preElement.innerText = infoTable; // Preserve spacing & line breaks
        userTerminalBody.appendChild(preElement);
    }
        

    function addOutput(text) {
        const outputLine = document.createElement("div");
        outputLine.classList.add("terminal-output");
        outputLine.innerText = text.trim();
        userTerminalBody.appendChild(outputLine);
        userTerminalBody.scrollTop = userTerminalBody.scrollHeight; 
    }

    function typewriterEffect(language) {
        const codeSnippets = {
            python: `
def brute_force_search(text, pattern):
n = len(text)
m = len(pattern)
found = False
    
for i in range(n - m + 1):
    match = True
    for j in range(m):
        if text[i + j] != pattern[j]:
            match = False
            break
    if match:
        print(f"Pattern found at index {i}")
        found = True

    if not found:
        print("Pattern not found in the text.")

# Input
text = input("Enter the text: ")
pattern = input("Enter the pattern: ")

# Search
brute_force_search(text, pattern)`,

            c: `
#include <stdio.h>
#include <string.h>

void bruteForceSearch(char text[], char pattern[]) {
    int n = strlen(text);
    int m = strlen(pattern);
    int found = 0;

    for (int i = 0; i <= n - m; i++) {
        int j;
        
        for (j = 0; j < m; j++) {
            if (text[i + j] != pattern[j])
                break;
        }

        if (j == m) {
            printf("Pattern found at index %d", i);
            found = 1;
        }
    }

    if (!found)
        printf("Pattern not found in the text.");
}

int main() {
    char text[100], pattern[50];

    printf("Enter the text: ");
    scanf("%s", text);
    
    printf("Enter the pattern: ");
    scanf("%s", pattern);

    bruteForceSearch(text, pattern);

    return 0;
}`,
            java: `
import java.util.Scanner;

public class BruteForceSearch {

    public static void bruteForceSearch(String text, String pattern) {
        int n = text.length();
        int m = pattern.length();
        boolean found = false;
        
        for (int i = 0; i <= n - m; i++) {
            boolean match = true;
            for (int j = 0; j < m; j++) {
                if (text.charAt(i + j) != pattern.charAt(j)) {
                    match = false;
                    break;
                }
            }
            if (match) {
                System.out.println("Pattern found at index " + i);
                found = true;
            }
        }

        if (!found) {
            System.out.println("Pattern not found in the text.");
        }
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter the text: ");
        String text = scanner.nextLine();
        
        System.out.print("Enter the pattern: ");
        String pattern = scanner.nextLine();

        bruteForceSearch(text, pattern);
        
        scanner.close();
    }
}`  
    };

        mainTerminalBody.innerHTML = ""; // Clear previous content
        const preElement = document.createElement("pre");
        const codeElement = document.createElement("code");
        codeElement.classList.add(`language-${language}`);
        preElement.appendChild(codeElement);
        mainTerminalBody.appendChild(preElement);

        let text = codeSnippets[language];
        let index = 0;

        function type() {
            if (index < text.length) {
                codeElement.innerHTML += text[index];
                index++;
                setTimeout(type, 5); // Adjust speed of typing
            } else {
                Prism.highlightAll(); // Apply syntax highlighting
            }
        }

        type();
    }

    function displayHelp() {
        addOutput("Available commands:\n" +
                  "/clear  - Clear the terminal\n" +
                  "/ls     - List available contents\n" +
                  "/python - Display Python code\n" +
                  "/c      - Display C code\n" +
                  "/java   - Display Java code\n" +
                  "/info   - Display user information");
    }
    

     // FIX: Clicking anywhere on the user terminal activates input
    userTerminalBody.addEventListener("click", function () {
        const lastInput = userTerminalBody.querySelector(".input[contenteditable='true']");
        if (lastInput) {
            lastInput.focus(); // Ensure input is always active
        }
    });


    displayHelp();
    appendPrompt();
});






   
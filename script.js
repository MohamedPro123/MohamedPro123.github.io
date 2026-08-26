// DRAGGING

console.log("drag script loaded, update v1.1 working");

const windowEl = document.querySelector(".window");
const titleBar = windowEl.querySelector(".title-bar");

let isDragging = false;
let offsetX = 0;
let offsetY = 0;

// Ensure the window has initial left/top
const rect = windowEl.getBoundingClientRect();
windowEl.style.position = "absolute";
windowEl.style.left = rect.left + "px";
windowEl.style.top = rect.top + "px";

titleBar.addEventListener("mousedown", (e) => {
  isDragging = true;

  const rect = windowEl.getBoundingClientRect();
  offsetX = e.clientX - rect.left;
  offsetY = e.clientY - rect.top;

  document.body.style.userSelect = "none";
  windowEl.style.zIndex = 1000; // bring to front while dragging
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  // Clamp to viewport (optional, prevents moving off-screen)
  const newLeft = e.clientX - offsetX;
  const newTop = e.clientY - offsetY;

  windowEl.style.left = Math.max(0, newLeft) + "px";
  windowEl.style.top = Math.max(0, newTop) + "px";
});

document.addEventListener("mouseup", () => {
  if (!isDragging) return;
  isDragging = false;
  document.body.style.userSelect = "";
});
;



// TOOLTIPS

 // Dictionary mapping terms to definitions
        const tooltip_dict = {
            "football": "A high-level, interpreted programming language.",
            "HTML": "HyperText Markup Language used for structuring web pages.",
            "CSS": "Cascading Style Sheets used for styling web pages."
        };

        // Create the element structure and properties
        const tooltip = document.createElement("div");
        tooltip.setAttribute("id", "tt"); 
        tooltip.className = "tooltip is-top is-right"; 
        tooltip.setAttribute("role", "tooltip");
        document.body.appendChild(tooltip);

        // Tooltip Visibility and Mouse Tracking Logic
        window.tooltip_on = function(html) {
            if (tooltip_dict[html] != null) {
                tooltip.innerHTML = tooltip_dict[html];
            }
            tooltip.style.visibility = "visible";
            document.onmousemove = (event) => {
                tooltip.style.left = `${event.pageX + 10}px`;
                tooltip.style.top = `${event.pageY + 10}px`;
            };
        };

        window.tooltip_off = function() {
            tooltip.style.visibility = "hidden";
            document.onmousemove = null;
        };

        // Word Replacer Engine
        function tooltip_replace(text, terms) {
            const escapedTerms = terms.map(term => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
            const regex = new RegExp(`\\b(${escapedTerms.join('|')})\\b`, 'g');

            return text.replace(regex, (match) => {
                return `<span class="tooltip-trigger" 
                            onmouseover="tooltip_on(this.innerHTML);" 
                            onmouseout="tooltip_off()">` + match + `</span>`;
            });
        }

        // Run when page loads
        document.addEventListener("DOMContentLoaded", () => {
            const rawText = "Learning HTML, CSS, and JavaScript is essential for modern web developers.";
            const keywords = ["HTML", "CSS", "football"];

            const processedHTML = tooltip_replace(rawText, keywords);
            
            const container = document.getElementById("text-container");
            if (container) {
                container.innerHTML = processedHTML;
            }
        });

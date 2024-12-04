document.addEventListener('DOMContentLoaded', () => {
    // Skill Bar Animation
    const skillBars = document.querySelectorAll('.skill-bar');
    
    const observerOptions = {
        threshold: 0.1
    };

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const percentage = bar.getAttribute('data-percent');
                const progress = bar.querySelector('.skill-progress');
                progress.style.width = `${percentage}%`;
            }
        });
    }, observerOptions);

    skillBars.forEach(bar => {
        bar.querySelector('.skill-progress').style.width = '0%';
        skillObserver.observe(bar);
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetSection = document.querySelector(this.getAttribute('href'));
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    });
    const titles = ["Aspiring Game Developer", "Literature Geek", "Editor","Web devloper"];
let index = 0;

function changeTitle() {
    const titleElement = document.querySelector('.input');
    titleElement.textContent = titles[index];
    index = (index + 1) % titles.length;
}

setInterval(changeTitle, 1500); // Change every 3 seconds
document.addEventListener('DOMContentLoaded', () => {
    const skillTree = document.querySelector('#skill-tree');
    const nodes = document.querySelectorAll('.skill-node');
    const radius = 150; // Radius of the circle

    nodes.forEach((node, index) => {
        const angle = (index / nodes.length) * 2 * Math.PI; // Distribute evenly
        const x = radius * Math.cos(angle) + skillTree.offsetWidth / 2;
        const y = radius * Math.sin(angle) + skillTree.offsetHeight / 2;

        node.style.left = `${x}px`;
        node.style.top = `${y}px`;
    });

    nodes.forEach(node => {
        node.addEventListener('click', () => {
            alert(`You selected ${node.dataset.skill}!`);
        });
    });
});
function createSkillTree() {
    const skillTree = document.querySelector('.skill-tree');
    const centerNode = document.querySelector('.center-node');
    const skillNodes = document.querySelectorAll('.skill-node');
    
    // Get the dimensions of the skill tree
    const treeWidth = skillTree.offsetWidth;
    const treeHeight = skillTree.offsetHeight;
    
    // Center coordinates
    const centerX = treeWidth / 2;
    const centerY = treeHeight / 2;
    
    // Calculate radius (slightly smaller than half the tree width)
    const radius = treeWidth * 0.35; 

    // Determine number of nodes
    const nodeCount = skillNodes.length;

    // Store connection lines
    const connectionLines = [];

    skillNodes.forEach((node, index) => {
        // Calculate precise angular positioning
        const angle = (index / nodeCount) * (2 * Math.PI) - Math.PI / 2;
        
        // Calculate x and y positions
        const x = centerX + radius * Math.cos(angle) - node.offsetWidth / 2;
        const y = centerY + radius * Math.sin(angle) - node.offsetHeight / 2;
        
        // Set node position
        node.style.position = 'absolute';
        node.style.left = `${x}px`;
        node.style.top = `${y}px`;

        // Create connection line
        const line = document.createElement('div');
        line.classList.add('connection-line');
        
        // Calculate line length to center
        const nodeCenterX = x + node.offsetWidth / 2;
        const nodeCenterY = y + node.offsetHeight / 2;
        
        const dx = nodeCenterX - centerX;
        const dy = nodeCenterY - centerY;
        
        // Calculate line length
        const length = Math.sqrt(dx * dx + dy * dy);
        
        // Calculate rotation angle
        const lineAngle = Math.atan2(dy, dx) * (180 / Math.PI);

        // Style the connection line
        line.style.width = `${length}px`;
        line.style.transformOrigin = 'left center';
        line.style.transform = `rotate(${lineAngle}deg)`;
        line.style.position = 'absolute';
        line.style.left = `${centerX}px`;
        line.style.top = `${centerY}px`;

        // Append line to skill tree
        skillTree.appendChild(line);

        // Store reference to the line
        connectionLines.push(line);

        // Add hover event listeners to skill nodes
        node.addEventListener('mouseenter', () => {
            // Reset all lines
            connectionLines.forEach(l => {
                l.style.backgroundColor = 'rgba(128, 128, 128, 0.2)';
                l.style.height = '2px';
            });

            // Highlight specific line
            line.style.backgroundColor = '#007ced';
            line.style.height = '3px';
            node.style.backgroundColor = '#007ced';
            node.style.transform = 'scale(1.1)';
        });

        node.addEventListener('mouseleave', () => {
            // Reset line and node
            line.style.backgroundColor = 'rgba(128, 128, 128, 0.2)';
            line.style.height = '2px';
            node.style.backgroundColor = 'rgba(128, 128, 128, 0.3)';
            node.style.transform = 'scale(1)';
        });
    });

    // Add hover event listeners to center node
    centerNode.addEventListener('mouseenter', () => {
        // Highlight all lines
        connectionLines.forEach(line => {
            line.style.backgroundColor = '#007ced';
            line.style.height = '3px';
        });

        // Scale center node
        centerNode.style.transform = 'translate(-50%, -50%) scale(1.1)';
    });

    centerNode.addEventListener('mouseleave', () => {
        // Reset all lines
        connectionLines.forEach(line => {
            line.style.backgroundColor = 'rgba(128, 128, 128, 0.2)';
            line.style.height = '2px';
        });

        // Reset center node
        centerNode.style.transform = 'translate(-50%, -50%) scale(1)';
    });
}

// Ensure the function runs after DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Slight delay to ensure all elements are rendered
    setTimeout(createSkillTree, 100);
});
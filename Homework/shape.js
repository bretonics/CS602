// Object with all available shapes
var shapes = {
    1:"Trapezoid",
    2:"Cone",
    3:"Square",
    4:"Circle",
    5:"Rectangle",
    6:"Cylinder",
    7:"Triangle",
}

// Read input stream
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Print questions to user
console.log('\nPlease choose the type of shape you want to find the area for:\n');

// Print list oall of shape options
for (var shape in shapes) {
    if (shapes.hasOwnProperty(shape)) {
        console.log(shape + ".", shapes[shape]);
    }
}

// Get input from user in console and do area calculation based on shape
rl.question('\nShape: ', (shape) => {

    console.log(`\nLooking up area formula for ${shape}...\n`);

    // Delegate logic from user choice
    switch (shape.toLowerCase()) {

        case 'trapezoid':
            rl.question('Enter first base length: ', (a) => {
                rl.question('Enter second base length: ', (b) => {
                    rl.question('Enter height: ', (h) => {
                        var A = ( (parseInt(a) + parseInt(b)) / 2 ) * parseInt(h);
                        area(A);
                    });
                });
            });
            break;

        case 'cone':
            rl.question('Enter radius: ', (r) => {
                r = parseInt(r);
                rl.question('Enter height: ', (h) => {
                    h = parseInt(h);
                    var A = Math.PI * r * ( r + Math.sqrt(h*h + r*r) );
                    area(A);
                });
            });
            break;

        case 'square':
            rl.question(`Enter length of ${shape}\'s side: `, (s) => {
                var A = Math.pow(parseInt(s),2);
                area(A);
            });
            break;

        case 'circle':
            rl.question('Enter radius: ', (r) => {
                var A = Math.PI * parseInt(r) * parseInt(r);
                area(A);
            });
            break;

        case 'rectangle':
            rl.question('Enter height: ', (h) => {
                h = parseInt(h);
                rl.question('Enter length: ', (l) => {
                    l = parseInt(l);
                    var A = l * h;
                    area(A);
                });
            });
            break;

        case 'cylinder':
            rl.question('Enter radius: ', (r) => {
                r = parseInt(r);
                rl.question('Enter height: ', (h) => {
                    h = parseInt(h);
                    var A = (2 * Math.PI * r * h )+ (2 * Math.PI * r * r) ;
                    area(A);
                });
            });
            break;

        case 'triangle':
            rl.question('Enter height: ', (h) => {
                h = parseInt(h);
                rl.question('Enter base: ', (b) => {
                    b = parseInt(b);
                    var A = (h * b) / 2;
                    area(A);
                });
            });
            break;

        default:
            console.log(`Sorry, I can't determine the area for ${shape}.`);
            rl.close();  // close input stream
    }

});

// Print calculated area to user.
function area(A) {
    console.log('\nArea = ', A, '\n');
    rl.close();  // close input stream
}

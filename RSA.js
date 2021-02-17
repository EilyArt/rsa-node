const { euclid } = require('./euclid');
const math = require('mathjs');

function between(min, max) {
    return Math.floor(
        Math.random() * (max - min) + min
    );
}


module.exports.RSA = function (p, q, m) {

    primes = [2, 3, 5, 7, 11, 13, 17
        // , 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97
    ];
    // primes = [7];
    let N = p * q;
    let phi = (p - 1) * (q - 1);

    while (true) {
        console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n');
        let d;
        while (true) {
            d = primes[Math.floor(Math.random() * primes.length)];
            let gcd = math.gcd(d, phi);
            if (gcd == 1 && gcd <= N) break;
        }

        console.log('\n                               RSA Start...\n');
        console.log(`N = p . q => N = ${p} * ${q} = ${N} => N = ${N}`);
        console.log(`φ(N) = (p-1).(q-1) => φ(N) = (${p}-1) * (${q}-1) = ${phi} => φ(N) = ${phi}`);
        console.log(`d = ${d} gcd(${d}, (${p}-1) * (${q}-1)) = 1`);
        console.log(`e * d = 1 (mod (${p}-1) * (${q}-1)))`);
        console.log(`e = ${d}^-1 mod ${phi}`);

        e = euclid(phi, d);
        console.log("\n                                  End of Euclid");
        console.log("\n                                  Check...");
        console.log(`e = (${d})^-1 mod ${phi} = ${e} `);
        console.log(`${d} * ${e} mod ${phi} = ${e * d} mod ${phi} = `, math.mod(e * d, phi) + `\n`);
        console.log('\n                                ENCRYPTION...\n');

        let C = m**d;
        C %= N;
        console.log(`M^e  mod N = ${m}^${d} mod ${N} = ` + C);

        let M = C**e;
        M %= N;
        console.log("\n                                 DECRYPTION...");
        console.log(`M = C^d mod N\nM = ${C}^${e} mod ${N} = ${M}`);

        if(M === m)
        break;
    }
};
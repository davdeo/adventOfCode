export function addHex(a: string, b: string): string {
    let result = '';
    let carry = 0;
    const maxLen = Math.max(a.length, b.length);

    for (let i = 0; i < maxLen; i++) {
        const numA = parseInt(a[a.length - i - 1], 16) || 0;
        const numB = parseInt(b[b.length - i - 1], 16) || 0;
        let sum = numA + numB + carry;

        if (sum >= 16) {
            sum -= 16;
            carry = 1;
        } else {
            carry = 0;
        }

        result = sum.toString(16) + result;
    }

    if (carry > 0) {
        result = carry.toString(16) + result;
    }

    return result;
}

export function divideHex(numberA: string, numberB: string): string {
    if (numberB === '0') {
        throw new Error('Division by zero error');
    }

    let remainder = '';
    let quotient = '';

    for (let i = 0; i < numberA.length; i++) {
        remainder += numberA[i];
        let temp = '';
        let j = 0;

        while (parseInt(remainder, 16) >= parseInt(numberB, 16)) {
            temp = (parseInt(remainder, 16) - parseInt(numberB, 16)).toString(16);
            remainder = temp === '0' ? '' : temp;
            j++;
        }

        quotient += j.toString(16);
    }

    if (quotient === '') {
        quotient = '0';
    }

    return quotient;
}

export function multiplyHex(numberA: string, numberB: string): string {
    let product = '0';

    for (let i = numberB.length - 1; i >= 0; i--) {
        let tempProduct = '';
        let carry = 0;

        for (let j = numberA.length - 1; j >= 0; j--) {
            const digitA = parseInt(numberA[j], 16);
            const digitB = parseInt(numberB[i], 16);
            let digitProduct = digitA * digitB + carry;
            carry = Math.floor(digitProduct / 16);
            digitProduct %= 16;
            tempProduct = digitProduct.toString(16) + tempProduct;
        }

        if (carry > 0) {
            tempProduct = carry.toString(16) + tempProduct;
        }

        tempProduct += '0'.repeat(numberB.length - i - 1);
        product = addHex(product, tempProduct);
    }

    return product;
}

export function moduloHex(numberA: string, numberB: string): string {
    if (numberB === '0') {
        throw new Error('Division by zero error');
    }

    let remainder = '';

    for (let i = 0; i < numberA.length; i++) {
        remainder += numberA[i];
        let temp = '';
        let j = 0;

        while (parseInt(remainder, 16) >= parseInt(numberB, 16)) {
            temp = (parseInt(remainder, 16) - parseInt(numberB, 16)).toString(16);
            remainder = temp === '0' ? '' : temp;
            j++;
        }
    }

    if (remainder === '') {
        remainder = '0';
    }

    return remainder;
}
import fs from 'fs';
import path from 'path';

const OTP_STORE_PATH = path.join(process.cwd(), 'tmp', 'otpStore.json');

// Ensure the tmp directory exists
if (!fs.existsSync(path.join(process.cwd(), 'tmp'))) {
    fs.mkdirSync(path.join(process.cwd(), 'tmp'));
}

// Initialize store file if it doesn't exist
if (!fs.existsSync(OTP_STORE_PATH)) {
    fs.writeFileSync(OTP_STORE_PATH, JSON.stringify({}));
}

const readStore = () => {
    try {
        return JSON.parse(fs.readFileSync(OTP_STORE_PATH, 'utf8'));
    } catch (error) {
        return {};
    }
};

const writeStore = (data) => {
    fs.writeFileSync(OTP_STORE_PATH, JSON.stringify(data));
};

export const storeOTP = (email, otp) => {
    const store = readStore();
    store[email] = {
        otp,
        expiry: Date.now() + 5 * 60 * 1000 // 5 minutes
    };
    writeStore(store);
};

export const verifyOTP = (email, otp) => {
    const store = readStore();
    const storedData = store[email];
    
    if (!storedData) {
        return {
            valid: false,
            message: "OTP has expired or not sent. Please request a new OTP"
        };
    }

    if (Date.now() > storedData.expiry) {
        delete store[email];
        writeStore(store);
        return {
            valid: false,
            message: "OTP has expired. Please request a new OTP"
        };
    }

    if (storedData.otp !== otp) {
        return {
            valid: false,
            message: "Invalid OTP"
        };
    }

    // Clear OTP after successful verification
    delete store[email];
    writeStore(store);
    return {
        valid: true,
        message: "OTP verified successfully"
    };
};
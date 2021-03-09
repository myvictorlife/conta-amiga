export class AppConstants {

    public static ENV = {
        API_URL: 'https://friendapi.us-east-2.elasticbeanstalk.com',
        APP_ID: 'com.viajantes',
        APP_NAME: 'Viajantes',
        APP_DESCRIPTION: 'App para Viajantes',
    };

    public static API_CONFIGS = {
        TIMEOUT: 120000,
    };

    // Endpoints
    public static API_ENDPOINTS = {
        LOGIN:  'login',
        CREATE_USER: 'users',
        EXPENSE: 'expense',
        PRINCIPAL: 'principal',
        RECOVERY_PASSWORD: 'recovery-password',
        TRAVELS: 'travels',
        TRAVELS_USERS: 'travels/users'
    };

    public static STORAGE_NAMES = {
        APP_TRANSLATIONS: 'APP_TRANSLATIONS',
        USER_TOKEN: 'USER_TOKEN',
        DEVICE_LANGUAGE: 'DEVICE_LANGUAGE',
    };

    public static TRIES = {
        NTRIES: 3,
    };

}

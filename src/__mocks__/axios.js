import testDataAccounts from '../data/testDataAccounts';

export default {
    get: jest.fn().mockResolvedValue({ data: testDataAccounts })
};
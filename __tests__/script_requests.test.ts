import { getUsers, getFollowed } from '../script_requests';

describe('getUsers function', () => {
    test('should fetch users data', async () => {
        const users = await getUsers();
        expect(users).toBeDefined();
    });
});

describe('getFollowed function', () => {
    test('should fetch followed users data', async () => {
        const followed = await getFollowed('df17d9aa-a8a9-4970-988d-d708648d6214'); // userId - following
        expect(followed).toBeDefined();    
    });

    test('should fetch empty array for users not following players', async () => {
        const followed = await getFollowed('8c04361e-675c-42bc-ba4f-9dfdb5e24973'); //userId - not following
        expect(followed).toEqual([]);    
    });

    test('should throw an error if no userId passed', async () => {
        await expect(getFollowed('')).rejects.toThrow(TypeError);
    });

    test('should return an empty array for invalid userId', async () => {
        const followed = await getFollowed('invalidUserID');
        expect(followed).toEqual([]);    
    });
});

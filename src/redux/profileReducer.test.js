import { render, screen } from '@testing-library/react';
import { addPostCreator } from './profileReducer';

test('length should be incremented', () => {
    let action = addPostCreator('hello')
    const state = {
        posts: [
            {id: 1, message: 'Hey', likesCount: 12},
            {id: 2, message: 'How are you?', likesCount: 15},
            {id: 3, message: 'Nice to meet you', likesCount: 22},
            {id: 4, message: 'Whats new today?', likesCount: 9},
        ]
    }
    
    let newState = profileReducer(state, action)
    expect(newState.posts.length === 5).toBe(5)
});




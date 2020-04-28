import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, fireEvent} from '@testing-library/react'
import Blog from './Blog'

describe('Testing of Blog Component', ()=>{
    const mockUser = {
        name: 'mockname',
        username: 'mockusername',
        token: '123'
    }

    const blogBelong = {
        title: 'This blog is created by mockname',
        author: 'Lorum Ipsum',
        url: 'www.fakeurl.com',
        likes: 10,
        user: mockUser
    }    

    // const blogNotBelong = {
    //     title: 'This blog is not created by mockname',
    //     author: 'Lorum Ipsum',
    //     url: 'www.fakeurl.com',
    //     likes: 1,
    //     user: {
    //         name: 'wtf',
    //         username: 'thisworkslol',
    //         token: 'doesit?'
    //     }
    // }    

    const deleteBlog = jest.fn()
    const addLike = jest.fn()

    let component
    
    beforeEach(()=>{
        component = render(
        <Blog user={mockUser} blog={blogBelong} deleteBlog={deleteBlog} addLike={addLike} />    
        )
    })

    test('renders the blog title and author', ()=>{
        const blog = component.container.querySelector('.Blog')
        expect(blog).toBeDefined()
        expect(blog).not.toHaveStyle('display: none')
        expect(component.container).toHaveTextContent(
            'This blog is created by mockname by Lorum Ipsum'
        )
        expect(component.container).not.toHaveTextContent(
            'www.fakeurl.com'
        )
    })

    test('blogs url and likes are shown when view button is clicked', ()=>{
        const button = component.getByText('View')
        fireEvent.click(button)

        expect(component.container).toHaveTextContent(
            'www.fakeurl.com10 like'
        )
    })

    test('like button clicked twice, event handler is called twice', ()=>{
        const button = component.getByText('View')
        fireEvent.click(button)

        const likeButton = component.getByText('like')
        fireEvent.click(likeButton)
        fireEvent.click(likeButton)
        
        expect(addLike.mock.calls).toHaveLength(2)
    })
})
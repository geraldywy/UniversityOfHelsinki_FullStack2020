import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, fireEvent} from '@testing-library/react'
import BlogForm from './BlogForm'

test('BlogForm updates parent state and calls onSubmit', ()=>{
    const createNewBlog = jest.fn()

    const component = render(
        <BlogForm addBlog={createNewBlog} />
    )

    const inputTitle = component.container.querySelector('#title')
    const inputAuthor = component.container.querySelector('#author')
    const inputUrl = component.container.querySelector('#url')

    fireEvent.change(inputTitle, {
        target: {value: 'Sample Title'}
    })
    fireEvent.change(inputAuthor, {
        target: {value: 'Sample Author'}
    })
    fireEvent.change(inputUrl, {
        target: {value: 'Sample Url'}
    })

    const button = component.getByText('create')
    fireEvent.click(button)

    expect(createNewBlog.mock.calls).toHaveLength(1)
    expect(createNewBlog.mock.calls[0][0]).toEqual({
        "author": "Sample Author", 
        "title": "Sample Title", 
        "url": "Sample Url"
    })

})
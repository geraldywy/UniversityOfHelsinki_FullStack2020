const listHelper = require('../utils/list_helper')
const test_helper = require('../utils/test_helper')
const listWithOneBlog = test_helper.listWithOneBlog
const blogs = test_helper.blogs


describe("dummy", ()=>{
  const dummy = listHelper.dummy

  test("should return 1", ()=>{
  expect(dummy([])).toBe(1)
  })

  test("gimme 1", ()=>{
    expect(dummy([1, 2, 3])).toBe(1)
  })
})



describe('total likes', () => {

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test("a bunch of blogs", ()=>{
    expect(listHelper.totalLikes(blogs)).toBe(36)
  })

})

describe("fav blog", ()=>{
  const favoriteBlog = listHelper.favoriteBlog

  test("fav blog when empty", ()=>{
    expect(favoriteBlog([])).toEqual(null)
  })
  test("only 1", ()=>{
    expect(favoriteBlog(listWithOneBlog)).toEqual(listWithOneBlog[0])
  })
  test("many blogs", ()=>{
    expect(favoriteBlog(blogs)).toEqual({ _id: "5a422b3a1b54a676234d17f9", title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12, __v: 0 })
  })

})


describe("most blogs", ()=>{
  const mostBlogs = listHelper.mostBlogs

  test("most when empty", ()=>{
    expect(mostBlogs([])).toBe(null)
  })
  test("only 1", ()=>{
    expect(mostBlogs(listWithOneBlog)).toBe(listWithOneBlog[0].author)
  })
  test("many blogs", ()=>{
    expect(mostBlogs(blogs)).toBe("Robert C. Martin")
  })
})

describe("most likes", ()=>{
  const mostLikes = listHelper.mostLikes

  test("empty array", ()=>{
    expect(mostLikes([])).toEqual(null)
  })

  test("list with one blog", ()=>{
    expect(mostLikes(listWithOneBlog)).toEqual({"author": listWithOneBlog[0].author, "likes": listWithOneBlog[0].likes})
  })

  test("many blogs", ()=>{
    expect(mostLikes(blogs)).toEqual({author: "Edsger W. Dijkstra", likes: 17})
  })
})


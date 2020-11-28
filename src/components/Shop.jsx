import React, { Component } from 'react';
import bookCover from '../images/book_cover.jpg';
import Search from './common/search';
import StarRatings from 'react-star-ratings';
import * as bookService from '../services/bookService';

class Shop extends Component {
  state = {
    categories: [],
    pageCounter: 1,
    books: [],
  };
  async componentDidMount() {
    const categories = await bookService.getAllCategory();
    this.getBooks(this.state.pageCounter);
    this.setState({ categories: categories.data });
  }

  async getBooks(pageNo) {
    if (pageNo > 0) {
      const books = await bookService.getBooks(pageNo);

      this.setState({ books: books.data });
      this.setState({ pageCounter: pageNo });
    }
  }

  render() {
    const { categories, pageCounter, books } = this.state;
    return (
      <>
        <div className="image__container">
          <img src={bookCover} alt="bookCover" className="book__cover" />
        </div>
        <div className="shop__container">
          {/* List of All Category */}
          <div className="category__container">
            <h3>Categories</h3>
            <ul className="category__list">
              {categories.map((data) => (
                <li key={categories.indexOf(data)}>{data}</li>
              ))}
            </ul>
          </div>
          <div className="books__container">
            <div className="controls">
              <Search />
              {/* Buttons to toggle between 10 books at a time*/}
              <div className="page__btn">
                <button onClick={() => this.getBooks(pageCounter + 1)}>
                  Next
                </button>
                <button onClick={() => this.getBooks(pageCounter - 1)}>
                  Prev
                </button>
              </div>
            </div>
            {/*Books container to Display books  */}
            <div className="books">
              {books.map((data) => (
                <div className="book" key={books.indexOf(data)}>
                  <div className="left__container">
                    <img
                      src={data.images}
                      alt={data.title}
                      className="book__img"
                    />
                  </div>
                  <div className="right__container">
                    <p className="title">{data.title}</p>
                    <p className="author">{data.author}</p>
                    <div className="price">
                      Price: {'    '}
                      <span>$ {`${data.price}`}</span>
                      <div className="stars">
                        <StarRatings
                          rating={data.stars}
                          starRatedColor="blue"
                          starDimension={20}
                          numberOfStars={5}
                          name="rating"
                          className="star"
                        />
                      </div>
                    </div>
                    <p className="format">{data.format}</p>
                    <button className="addtocart">Add To Cart</button>
                    <button className="view">View</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="controls controls_bottom">
              <div className="page__btn">
                <button onClick={() => this.getBooks(pageCounter + 1)}>
                  Next
                </button>
                <button onClick={() => this.getBooks(pageCounter - 1)}>
                  Prev
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Shop;

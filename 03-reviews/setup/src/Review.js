import React, { useState } from 'react';
import people from './data';
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from 'react-icons/fa';

const Review = () => {
  const [index, setIndex] = useState(0);
  const { name, job, image, text } = people[index];

  const nextReview = () => {
    setIndex((index) => {
      return index === people.length - 1 ? 0 : index + 1
    })
  }

  const prevReview = () => {
    setIndex((index) => {
      return index === 0 ? people.length - 1 : index - 1
    })

  }

  const randomReview = () => {
    let randomNumber = Math.floor((Math.random() * people.length));
    if (randomNumber === index) {
      return randomReview()
    }
    return setIndex(randomNumber)

  }

  return <article className="review">
    <div className="img-container">
      <img src={image} alt={name} className=
        "person-img" />
      <span className="quote-icon">
        <FaQuoteRight />
      </span>
    </div>
    <h4 className="author"> {name}</h4>
    <p className="job">{job}</p>
    <p className="info">{text}</p>
    <div className="button-container">
      <button className="prev-btn" onClick={prevReview}> <FaChevronLeft /> </button>
      <button className="next-btn" onClick={nextReview}> <FaChevronRight /> </button>
      <button className="random-btn" onClick={randomReview}> surprise me </button>
    </div>
  </article>;
};

export default Review;

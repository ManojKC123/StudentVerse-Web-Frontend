import { Grid } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSingleQuestion } from '../data/api';
import addAnswer from '../components/addAnswer';

function SingleQuestion(props) {
  const itemID = props.match.params.id;
  const [post, setPost] = useState([]);
  useEffect(() => {
    getSingleQuestion(itemID).then((response) => {
      if (response.data) {
        setPost(response.data);
        console.log('posts', response.data);
      }
    });
  }, []);

  return (
    <div id='home-section' className='homepage'>
      <Grid container>
        <Grid item xs={2} md={2} className=''></Grid>
        <Grid item xs={9} md={9} className=''>
          <div className='questions-grid'>
            <h3 className='questions-headline'>Top Questions</h3>
            <div className='questions-btn'>
              <Link to='/ask-question' className='btn btn-primary1'>
                Ask Question
              </Link>
            </div>
          </div>

          <div className='row align-items-start'>
            <div className='col-3'>
              <div className='stats'>
                <div className='vote'>
                  <span className='vote-count'>2</span>
                  <div className='count-text'>Answers</div>
                </div>
                <div className='vote'>
                  <span className='vote-count'>4</span>
                  <div className='count-text'>tags</div>
                </div>
                <div className='vote'>
                  <div className='count-text'>5 views</div>
                </div>
              </div>
            </div>
            <div className='col-9'>
              <div className='row'>
                <p>{post.body}</p>
              </div>
              <div className='row'>
                {post.tags &&
                  post.tags.map((tag, index) => {
                    return (
                      <span className='singleQueTag' key={index}>
                        {tag}
                      </span>
                    );
                  })}
              </div>
              </div>
          </div>

          <div className='answer'>
            <form className="form">
              <div>
                <h5><b>Answers</b></h5>
                <h6><b>Your Answers</b></h6>
                <textarea name="text" rows="6" cols="80" placeholder="Enter your answers here....."></textarea>
              </div>
              <button class="button" type="submit">Post Your Answer</button>
            </form>
              
              
              <div className='row'>
                <textarea
                  className='form-control'
                  id='exampleFormControlTextarea1'
                  placeholder="Comment here....."
                  rows='1'
                />
                <button className='btn-cmt' variant='primary' type='submit'>
                  Comment
                </button>
              </div>
            <div className="card">
              <div className="card-header">
                <b>The Overflow Blog</b>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Tales from documentation: Write for your clueless user</li>
                <li className="list-group-item">Podcast 252: a conversation on diversity</li>
              </ul>
              <div className="card-header">
                <b>Upcoming Events</b>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">2021 Community Moderator Election ends in 7 days</li>
                <li className="list-group-item">2021 Community Moderator Election ends in 7 days</li>
              </ul>
              <div className="card-header">
                <b>Features</b>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Login and SignUp</li>
                <li className="list-group-item">Ask question and post answer</li>
                <li className="list-group-item">Tags, Vote, Users and Comment</li>
                <li className="list-group-item">Quiz and Study materials</li>
              </ul>
            </div>
          </div>
        </Grid>
        <Grid item xs={2} md={2} className=''></Grid>
      </Grid>
    </div>
  );
}

export default SingleQuestion;

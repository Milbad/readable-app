import React from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import sortBy from 'sort-by'
import { getdate } from '../Utils/helpers'
import  EditDelete  from './EditDelete'
import  VotingMechanism  from './VotingMechanism'
import Comment from 'mui-icons/fontawesome/comment-o'


const getFilteredPosts = (posts, filter) => {
  if(filter === 'SHOW_ALL') {
      return posts.filter(post => post.deleted === false)
    }
    else {
      return (posts.filter(post => post.category === filter.toLowerCase())).filter(post => post.deleted === false)
    }

}

const getCommentsLength = (post, comments) => {
  let cl= comments.filter(item =>item.parentId === post.id)
  return cl.length
}


class PostList extends React.Component{


  render(){
    const { posts, comments} = this.props
    return(
      <div className='center'>
      {posts.length === 0 && (
        <h2 style={{paddingTop: '40px'}}>No post found for that category</h2>
      )}
      <ul >
      {posts.map(post => (
        <li key={post.id} className='display-flex padding row border-bottom'>

          <div className='col-6'>
            <Link style={{ textDecoration: 'none' , color:'black'}} className='post-title' to={`/${post.category}/${post.id}`}>
            <h3 >{post.title}</h3>
            </Link>
            <div><i>Posted by {post.author} on {getdate(post.timestamp)}</i></div>
            <div>{getCommentsLength(post, comments)} <Comment style={{height:'18px', width:'18px'}} /></div>
          </div>
          <div className='col-2'>score:
              <span><VotingMechanism post={post} /></span>
            </div>
          <EditDelete post={post} />

        </li>
      ))}
      </ul>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    posts: getFilteredPosts(state.posts, state.filter).sort(sortBy('-'+ state.sortBy)),
    comments: state.comments
  }
}


export default connect(mapStateToProps)(PostList)

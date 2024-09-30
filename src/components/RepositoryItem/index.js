// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {eachReposDetails} = props
  const {name, issuesCount, forksCount, starsCount} = eachReposDetails
  const {avatarUrl} = eachReposDetails
  return (
    <li className="repos-list">
      <div className="img-con">
        <img className="img" src={avatarUrl} alt={name} />
        <h1 className="name-heading">{name}</h1>
      </div>
      <div className="stars-con">
        <img
          className="star-img"
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
        />
        <p className="stars-count">{starsCount} stars</p>
      </div>
      <div className="stars-con">
        <img
          className="star-img"
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
        />
        <p className="stars-count">{forksCount} forks</p>
      </div>
      <div className="stars-con">
        <img
          className="star-img"
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png "
          alt="open issues"
        />
        <p className="stars-count">{issuesCount} open issues</p>
      </div>
    </li>
  )
}
export default RepositoryItem

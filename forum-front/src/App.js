import './App.css';
import { Route, Switch } from 'react-router-dom'
import Registration from './components/registration/Registration';
import Header from './components/header/Header';
import Login from './components/login/Login';
import 'react-bootstrap'
import Home from './components/home/Home';
import Topic from './components/topic/Topic';
import Discussion from './components/discussion/Discussion';
import CreateDiscussion from './components/discussion/CreateDiscussion'
import Profile from './components/profile/Profile';
import Footer from './components/footer/Footer';
import Admin from './components/ADMIN/Admin';
import AdminTopics from './components/ADMIN/topic/AdminTopics';
import AdminComments from './components/ADMIN/comment/AdminComments';
import AdminDiscussions from './components/ADMIN/discussion/AdminDiscussions';

function App() {
  return (
		<div className='App'>
			<Header />
			<Switch>
				<Route exact path='/' component={Home} />
				<Route exact path='/profile' component={Profile} />
				<Route exact path='/registration' component={Registration} />
				<Route exact path='/login' component={Login} />
				<Route exact path='/topics/:topicId' component={Topic} />
				<Route
					exact
					path='/discussions/create'
					component={CreateDiscussion}
				/>
				<Route
					exact
					path='/discussions/:discussionId'
					component={Discussion}
				/>
				<Route exact path='/admin' component={Admin} />
				<Route exact path='/admin/topics' component={AdminTopics} />
				<Route exact path='/admin/comments' component={AdminComments} />
				<Route exact path='/admin/discussions' component={AdminDiscussions} />
			</Switch>
			<Footer />
		</div>
  )
}

export default App;

import { connect } from 'react-redux';

import homePage from '../components/homePage';

import { getQList } from '../actions/get/qList';

const mapStateToProps = state => ({
  isFetching: state.getQList.isFetching,
  qList: state.getQList.qList,
  error: state.getQList.error
});

const mapDispatchToProps = {
  getQList
};

export default connect(mapStateToProps, mapDispatchToProps)(homePage);

import { fromJS } from 'immutable';
import { APP_LOADED } from "containers/App/constants";
import { PostService } from "./post.service";

const initialState = fromJS({
    postService: null,
  });
  
  function servcieReducer(state = initialState, action, a) {
    switch (action.type) {
      case APP_LOADED:
        return state
            .set('postService', new PostService());
  
      default:
        return state;
    }
  }
  
  export default servcieReducer;
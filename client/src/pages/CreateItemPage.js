import { connect } from "react-redux";
import {CreateItem} from "../components/CreateItem";
import { createItem } from "../redux/actions/item";
const CreateItemPage = ({items,createItem})=>{

    return(
        <CreateItem items={items} createItem={createItem}>

        </CreateItem>
    )


}

const mapStateToProps = (state) => ({
    items:state.items.items,
  });
  
 export default connect(mapStateToProps,{createItem})(CreateItemPage);
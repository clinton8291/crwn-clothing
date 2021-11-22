import React from "react";
import "./directory.styles.scss";

import MenuItem from "../menu-item/menu-item.component";

import { createStructuredSelector } from "reselect";

import { selectDirectorySection } from "../../redux/directory/directory.selectors";

import { connect } from "react-redux";

const Directory = ({ sections }) => {
  return (
    <div className='directory-menu'>
      {sections.map(({ id, ...otherSectionParameters }) => {
        return <MenuItem key={id} {...otherSectionParameters} />;
      })}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySection,
});

export default connect(mapStateToProps)(Directory);

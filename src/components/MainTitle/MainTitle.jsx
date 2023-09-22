import React from 'react';
import PropTypes from 'prop-types';
import css from './MainTitle.module.css';

const MainTitle = ({ title }) => {
  return <h2 className={css.title}>{title}</h2>;
};

MainTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default MainTitle;

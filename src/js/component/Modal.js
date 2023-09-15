import React, { useState, useEffect, useContext } from "react";
import { json, useNavigate, useParams, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Contacts } from "../views/Contacts";
import { Context } from "../store/appContext";

export const Modal = props => {
	const [state, setState] = useState({
		//initialize state here
	});
	const context = useContext(Context)
	const [contact, setContact] = useState();
	const params = useParams
	const navigate = useNavigate
	return (
		<div className="modal" tabIndex="-1" role="dialog" style={{ display: props.show ? "inline-block" : "none" }}>
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Are you sure?</h5>
						{props.onClose ? (
							<button
								onClick={() => props.onClose()}
								type="button"
								className="close"
								data-dismiss="modal"
								aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						) : (
							""
						)}
					</div>
					<div className="modal-body">
						<p>Warning: unknown consequences after this point... Kidding!</p>
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-primary">
							Oh no!
						</button>
						<button type="button" className="btn btn-secondary" data-dismiss="modal"
						              onClick={async () => {
										
										  const response = await fetch(
											`https://playground.4geeks.com/apis/fake/contact/${
											  context.store.contactIdForModal
											}`,
											{
											  method: "delete",
											  headers: {
												"Content-Type": "application/json",
											  },
											 
											}
										  ); 
										  if(response.ok === true) {
											context.actions.getContacts()
										  }
										
										props.onClose && props.onClose();
									  }}
									>
							Do it!
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
/**
 * Define the data-types for
 * your component's properties
 **/
Modal.propTypes = {
	history: PropTypes.object,
	onClose: PropTypes.func,
	show: PropTypes.bool,
	onClick: PropTypes.func
};

/**
 * Define the default values for
 * your component's properties
 **/
Modal.defaultProps = {
	show: false,
	onClose: null,
	onClick: PropTypes.func
};
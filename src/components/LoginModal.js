import React from 'react'
import logo from '../img/museLogo.png';

//This is the old state use for hooks that ended up not working for this modal,
//but I'd like to keep this for future reference

// function LoginModal({ callback }) {
//     const [active, setActive] = useState(false);

//     const handleLoginClick = () => {
//         setActive(true);
//     }

//     const handleExitClick = () => {
//         setActive(false);
//     }

//     if (active){
//         return (
//             <div>
//                 Hello!
//             </div>
//         )
//     } else {
//         return (null)
//     }
// }

// export default LoginModal

/** 
 *  Turns out the data-toggle handles state for boostrap.
 *  The data-* is essentially a W3C way of saying this is custom data store on the tag
 * 
 *  Bootstrap is using these atrributes to determine whether or not to display the data
 *  inside the modal here only the button the modal as a child is needed and it just works.
 * 
 *  Interestingly, if you spawn one then use it React cannot clean up the left behind element.
 */
export const LoginButton = () => {
    return (
        <>
            <button type="button" className="btn btn-primary col-6" data-toggle="modal" data-target="#LoginModal">
                Log In
            </button>
            <LoginModal />
        </>
    )
}

const LoginModal = () => {   
    return (
        <div className="modal fade" id="LoginModal" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <img src={logo} className="Modal-logo" alt="logo" />
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                <div className="modal-body">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Username</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter Username..." />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Enter Password..." />
                    </div>
                    <button type="submit" className="btn btn-primary col-3 button-padding">Log In</button>
                </div>
                </div>
            </div>
        </div>
    )
}
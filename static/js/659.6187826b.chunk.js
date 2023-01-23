"use strict";(self.webpackChunksocial=self.webpackChunksocial||[]).push([[659],{2659:function(e,t,s){s.r(t),s.d(t,{default:function(){return se}});var a=s(1413),n=s(5671),o=s(3144),i=s(136),r=s(7277),u=s(2791),l=s(9439),c=s(1246),d="ProfileInfo_descriptionBlock__XBXuJ",F="ProfileInfo_ownerImageBlock__HWN6P",p="ProfileInfo_userImageBlock__sA4Yk",x="ProfileInfo_mainPhoto__QU8TO",h="ProfileInfo_fileUploadButton__3oibu",f="ProfileInfo_infoBlock__mZ2kj",m="ProfileInfo_infoElement__u9sc-",j="ProfileInfo_contact__sQB8W",_="ProfileInfo_fileUploadLabel__l5nfU",v="ProfileInfo_fileUploadInput__dw28P",b=(s(3508),{statusBlock:"ProfileStatus_statusBlock__bfH6I"}),P=s(184),g=function(e){(0,i.Z)(s,e);var t=(0,r.Z)(s);function s(){var e;(0,n.Z)(this,s);for(var a=arguments.length,o=new Array(a),i=0;i<a;i++)o[i]=arguments[i];return(e=t.call.apply(t,[this].concat(o))).state={editMode:!1,statusText:e.props.statusText},e.activateEditMode=function(){e.props.isOwner&&e.setState({editMode:!0,statusText:e.props.statusText})},e.deactivateEditMode=function(){e.setState({editMode:!1}),e.props.updateStatusText(e.state.statusText)},e.onStatusTextChange=function(t){e.setState({statusText:t.currentTarget.value})},e}return(0,o.Z)(s,[{key:"componentDidUpdate",value:function(e,t){e.statusText!==this.props.statusText&&this.setState({statusText:this.props.statusText})}},{key:"render",value:function(){return(0,P.jsxs)("div",{className:b.statusBlock,children:[!this.state.editMode&&(0,P.jsxs)("div",{onClick:this.activateEditMode,children:[(0,P.jsx)("span",{className:b.statusTitle,children:(0,P.jsx)("b",{children:"Status: "})}),(0,P.jsx)("span",{className:b.statusText,children:this.props.statusText||"no status"})]}),this.state.editMode&&(0,P.jsx)("div",{className:b.statusBlock,children:(0,P.jsx)("input",{onChange:this.onStatusTextChange,autoFocus:!0,onBlur:this.deactivateEditMode,value:this.state.statusText})})]})}}]),s}(u.Component),T=g,D=s(2026),k=s(5705),N=s(7103),y=/^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,w="Enter correct url!",C=N.Ry().shape({fullName:N.Z_().max(15,"max 15 symbols"),lookingForAJobDescription:N.Z_().max(300,"max 300 symbols"),aboutMe:N.Z_().max(300,"max 300 symbols"),contacts:N.Ry().shape({facebook:N.Z_().matches(y,w).nullable(),github:N.Z_().matches(y,w).nullable(),instagram:N.Z_().matches(y,w).nullable(),mainLink:N.Z_().matches(y,w).nullable(),twitter:N.Z_().matches(y,w).nullable(),vk:N.Z_().matches(y,w).nullable(),website:N.Z_().matches(y,w).nullable(),youtube:N.Z_().matches(y,w).nullable()})}),Z={submitButton:"ProfileDataForm_submitButton__Qoy7i"},S=function(e){var t=e.profile,s=e.onSubmit;return(0,P.jsx)(k.J9,{initialValues:t,onSubmit:function(e){s(e)},validationSchema:C,children:function(){return(0,P.jsxs)(k.l0,{children:[(0,P.jsxs)("div",{children:[(0,P.jsx)("b",{children:"Full name: "}),(0,P.jsx)(k.gN,{type:"text",name:"fullName",placeholder:"add name..."}),(0,P.jsx)(k.Bc,{name:"fullName",component:"span"})]}),(0,P.jsxs)("div",{children:[(0,P.jsx)("b",{children:"Looking for a job: "}),(0,P.jsx)(k.gN,{type:"checkbox",name:"lookingForAJob"})]}),(0,P.jsxs)("div",{children:[(0,P.jsx)("b",{children:"My profesional skills: "}),(0,P.jsx)(k.gN,{type:"textarea",name:"lookingForAJobDescription",placeholder:"add skills..."}),(0,P.jsx)(k.Bc,{name:"lookingForAJobDescription",component:"span"})]}),(0,P.jsxs)("div",{children:[(0,P.jsx)("b",{children:"About me: "}),(0,P.jsx)(k.gN,{type:"textarea",name:"aboutMe",placeholder:"add smth about..."}),(0,P.jsx)(k.Bc,{name:"aboutMe",component:"span"})]}),(0,P.jsxs)("div",{children:[(0,P.jsx)("b",{children:"Contacts:"})," ",Object.keys(t.contacts).map((function(e){return(0,P.jsxs)("div",{className:Z.contact,children:[(0,P.jsxs)("b",{children:[e,": "]}),(0,P.jsx)(k.gN,{type:"text",name:"contacts.".concat(e),placeholder:e}),(0,P.jsx)(k.Bc,{name:"contacts.".concat(e),component:"span"})]})}))]}),(0,P.jsx)("button",{className:Z.submitButton,type:"submit",children:"Save"})]})}})},A=s(7332),M=function(e){var t=e.profile,s=e.isOwner,a=e.goToEditMode;return(0,P.jsxs)("div",{className:f,children:[(0,P.jsxs)("div",{className:m,children:[(0,P.jsx)("b",{children:"Full name: "})," ",t.fullName]}),(0,P.jsxs)("div",{className:m,children:[(0,P.jsx)("b",{children:"Looking for a job:"})," ",t.lookingForAJob?"yes":"no"]}),t.lookingForAJob&&(0,P.jsxs)("div",{className:m,children:[(0,P.jsx)("b",{children:"My profesional skills:"})," ",t.lookingForAJobDescription]}),(0,P.jsxs)("div",{className:m,children:[(0,P.jsx)("b",{children:"About me:"})," ",t.aboutMe]}),(0,P.jsxs)("div",{className:m,children:[(0,P.jsx)("b",{children:"Contacts:"})," ",Object.keys(t.contacts).map((function(e){return(0,P.jsx)(E,{contactTitle:e,contactValue:t.contacts[e]})}))]}),s&&(0,P.jsx)("div",{children:(0,P.jsx)(A.ZP,{onClick:a,children:"Edit"})})]})},E=function(e){var t=e.contactTitle,s=e.contactValue;return(0,P.jsxs)("div",{className:j,children:[(0,P.jsxs)("b",{children:[t,":"]}),s]})},I=function(e){var t=(0,u.useState)(!1),s=(0,l.Z)(t,2),a=s[0],n=s[1];if(!e.profile)return(0,P.jsx)(c.Z,{});return(0,P.jsx)("div",{children:(0,P.jsxs)("div",{className:d,children:[(0,P.jsxs)("div",{className:e.isOwner?F:p,children:[(0,P.jsx)("img",{src:e.profile.photos.large||D,className:x,alt:""}),e.isOwner&&(0,P.jsx)(A.ZP,{className:h,children:(0,P.jsxs)("label",{className:_,children:["Choose File",(0,P.jsx)("input",{type:"file",onChange:function(t){var s;null!==(s=t.target.files)&&void 0!==s&&s.length&&e.savePhoto(t.target.files[0])},className:v})]})})]}),(0,P.jsx)(T,{statusText:e.statusText,updateStatusText:e.updateStatusText,isOwner:e.isOwner}),a?(0,P.jsx)(S,{profile:e.profile,onSubmit:function(t){e.saveProfile(t),n(!1)}}):(0,P.jsx)(M,{profile:e.profile,isOwner:e.isOwner,goToEditMode:function(){n(!0)}})]})})},B=s(8263),O={messageForm:"MyPosts_messageForm__CwdnH",postsTitle:"MyPosts_postsTitle__JWGQD",messageTitle:"MyPosts_messageTitle__Vzghl",messageInput:"MyPosts_messageInput__gsYZu",messageSubmit:"MyPosts_messageSubmit__MsdTi"},z="Post_item__c7nSS",J="Post_itemText__i2gCK",U=s(3211),$=s(9529),V=function(e){return(0,P.jsxs)("div",{className:z,children:[(0,P.jsx)(U.C,{style:{backgroundColor:"#87d068"},icon:(0,P.jsx)($.Z,{})}),(0,P.jsx)("div",{className:J,children:e.message})]})},R=N.Ry().shape({newPostText:N.Z_().min(10,"Must be longer than 10 characters").max(600,"Must be shorter than 600 characters").required("Required")}),W=function(e){return(0,P.jsxs)("div",{className:O.messageForm,children:[(0,P.jsx)("h1",{className:O.messageTitle,children:"Add Message"}),(0,P.jsx)(k.J9,{initialValues:{newPostText:""},validate:function(e){var t={};return e.newPostText||(t.newPostText="Required"),t},onSubmit:function(t){!function(t){e.addPost(t.newPostText)}(t),t.newPostText=""},validationSchema:R,children:function(){return(0,P.jsxs)(k.l0,{children:[(0,P.jsx)("div",{className:O.messageInput,children:(0,P.jsx)(k.gN,{type:"text",name:"newPostText",placeholder:"add post..."})}),(0,P.jsx)(k.Bc,{name:"newPostText",component:"div"}),(0,P.jsx)("button",{className:O.messageSubmit,type:"submit",children:"Send"})]})}})]})},q=function(e){var t=e.posts.map((function(e){return(0,P.jsx)(V,{message:e.message,likesCount:e.likesCount})}));return(0,P.jsxs)("div",{className:O.postsBlock,children:[(0,P.jsx)("h3",{className:O.postsTitle,children:"My Posts"}),(0,P.jsx)("div",{children:(0,P.jsx)(W,(0,a.Z)({},e))}),(0,P.jsx)("div",{className:O.posts,children:t})]})},L=s(8687),Q=(0,L.$j)((function(e){return{posts:e.profilePage.posts,newPostText:e.profilePage.newPostText}}),(function(e){return{addPost:function(t){e(B.Nw.addPostCreator(t))}}}))(q),H="Profile_profileWrapper__snMVu",G="Profile_profileInfoWrapper__htKeP",K=function(e){return(0,P.jsxs)("div",{className:H,children:[(0,P.jsx)("div",{className:G,children:(0,P.jsx)(I,{saveProfile:e.saveProfile,savePhoto:e.savePhoto,isOwner:e.isOwner,profile:e.profile,statusText:e.statusText,updateStatusText:e.updateStatusText})}),e.isOwner&&(0,P.jsx)("div",{children:(0,P.jsx)(Q,{})})]})},X=s(8277),Y=s(7781),ee=(s(9563),s(5772));var te=function(e){(0,i.Z)(s,e);var t=(0,r.Z)(s);function s(){return(0,n.Z)(this,s),t.apply(this,arguments)}return(0,o.Z)(s,[{key:"componentDidMount",value:function(){this.refreshProfile()}},{key:"componentDidUpdate",value:function(e){this.props.router.params.userId!=e.router.params.userId&&this.refreshProfile()}},{key:"refreshProfile",value:function(){var e=this.props.router.params.userId;e||(e=27158),this.props.setUserProfile(e),this.props.getStatusText(e)}},{key:"render",value:function(){return(0,P.jsx)(K,(0,a.Z)((0,a.Z)({},this.props),{},{profile:this.props.profile,statusText:this.props.statusText,updateStatusText:this.props.updateStatusText,isOwner:!this.props.router.params.userId,savePhoto:this.props.savePhoto,saveProfile:this.props.saveProfile}))}}]),s}(u.Component),se=(0,Y.qC)((0,L.$j)((function(e){return{profile:e.profilePage.profile,statusText:e.profilePage.statusText}}),{setUserProfile:B.nA,getStatusText:B.Tx,updateStatusText:B.Jb,savePhoto:B.m2,saveProfile:B.Gi}),(function(e){return function(t){var s={params:(0,ee.UO)()};return(0,P.jsx)(e,(0,a.Z)((0,a.Z)({},t),{},{router:s}))}}),X.e)(te)},8277:function(e,t,s){s.d(t,{e:function(){return u}});var a=s(1413),n=(s(2791),s(8687)),o=s(5772),i=s(184),r=function(e){return{isAuth:e.auth.isAuth}},u=function(e){return(0,n.$j)(r)((function(t){return t.isAuth?(0,i.jsx)(e,(0,a.Z)({},t)):(0,i.jsx)(o.Fg,{to:"/login"})}))}}}]);
//# sourceMappingURL=659.6187826b.chunk.js.map
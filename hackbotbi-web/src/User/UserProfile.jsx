var UserProfile = (function() {
    var mail = "";
  
    var getMail = function() {
      return mail;
    };
  
    var setMail = function(mail) {
      mail = mail;     
    };
  
    return {
      getMail: getMail,
      setMail: setMail
    }
  })();
export default UserProfile;
  
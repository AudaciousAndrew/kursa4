package kursa4.response_models;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class RegistrationResponse {

    private int Registration;
    private String login;
    private String errorMsg;

    public RegistrationResponse() {
    }

    public RegistrationResponse(int registration, String login, String errorMsg) {
        Registration = registration;
        this.login = login;
        this.errorMsg = errorMsg;
    }

    public String getErrorMsg() {
        return errorMsg;
    }

    public void setErrorMsg(String errorMsg) {
        this.errorMsg = errorMsg;
    }

    public int getRegistration() {
        return Registration;
    }

    public void setRegistration(int registration) {
        Registration = registration;
    }
}

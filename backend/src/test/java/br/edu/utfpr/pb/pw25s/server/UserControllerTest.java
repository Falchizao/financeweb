package br.edu.utfpr.pb.pw25s.server;
import static org.assertj.core.api.Assertions.assertThat;
import br.edu.utfpr.pb.pw25s.server.model.User;
import br.edu.utfpr.pb.pw25s.server.repository.UserRepository;
import br.edu.utfpr.pb.pw25s.server.utils.GenericResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class UserControllerTest {

    @Autowired
    TestRestTemplate testRestTemplate;

    @Autowired
    UserRepository userRepository;

    @BeforeEach()
    private void cleanUp(){
        userRepository.deleteAll();
        testRestTemplate.getRestTemplate().getInterceptors().clear();
    }

    @Test
    public void postUser_whenUserIsValid_receiveOk(){
        User user = createValidUser();
        ResponseEntity<Object> response = testRestTemplate.postForEntity("/users", user, Object.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);

    }

    @Test
    public void postUser_whenUserIsValid_userSavedToDatabase(){
        User user = createValidUser();
        ResponseEntity<Object> response = testRestTemplate.postForEntity("/users", user, Object.class);

        assertThat(userRepository.count()).isEqualTo(1);

    }

    @Test
    public void postUser_whenUserIsValid_receiveSucessMessage(){
        User user = createValidUser();
        user.setUsername("test-user");
        user.setDisplayName("test-display");
        user.setPassword("password");

        ResponseEntity<GenericResponse> response = testRestTemplate.postForEntity("/users", user, GenericResponse.class);

        assertThat(response.getBody().getMessage()).isNotNull();
    }

    @Test
    public void postUser_whenUserisValid_passwordisHashedInDatabase(){
        User user = createValidUser();
        testRestTemplate.postForEntity("/users", user, Object.class);

        List<User> userList = userRepository.findAll();
        User userDB = userList.get(0);
        assertThat(userDB.getPassword()).isNotEqualTo(user.getPassword());
    }
    
    @Test
    public void postUser_whenuserHasNullUsername_receiveBadRequest(){
        User user = createValidUser();
        user.setUsername("");
        ResponseEntity<Object>  response = testRestTemplate.postForEntity("/users", user, Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }


    private User createValidUser(){
        User user = new User();
        user.setUsername("test-user");
        user.setDisplayName("test-display");
        user.setPassword("password");
        return user;

    }
}

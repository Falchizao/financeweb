package br.edu.utfpr.pb.pw25s.server;

import br.edu.utfpr.pb.pw25s.server.controller.UserController;
import br.edu.utfpr.pb.pw25s.server.model.User;
import br.edu.utfpr.pb.pw25s.server.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import static org.assertj.core.api.Assertions.assertThat;

@AutoConfigureMockMvc
@ExtendWith(SpringExtension.class)
@WebMvcTest(controllers = UserController.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class UserTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    TestRestTemplate testRestTemplate;

    @MockBean
    private UserRepository userRepository;

    @BeforeEach
    public void setUp() {
        userRepository.deleteAll();
    }

    private User createValidUser() {
        User user = new User();
        user.setUsername("Pegorini");
        user.setDisplayName("pegorini");
        user.setPassword("12345");
        return user;
    }

    @Test
    @DisplayName("Should return ok if valid object")
    public void postCategory_whenUserIsValid_receiveOk(){
        User user = createValidUser();
        ResponseEntity<Object> response = testRestTemplate.postForEntity("/api/user/registrar", user, Object.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    @DisplayName("Should return the database populated size if the object is valid")
    public void postUser_whenUserIsValid_saveInDatabase(){
        User user = createValidUser();
        testRestTemplate.postForEntity("/api/user/registrar", user, Object.class);

        assertThat( userRepository.count() ).isEqualTo(1);
    }

}
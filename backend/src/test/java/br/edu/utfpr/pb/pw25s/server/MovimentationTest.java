package br.edu.utfpr.pb.pw25s.server;

import br.edu.utfpr.pb.pw25s.server.controller.MovimentationController;
import br.edu.utfpr.pb.pw25s.server.model.Movimentation;
import br.edu.utfpr.pb.pw25s.server.repository.MovimentationRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import static org.assertj.core.api.Assertions.assertThat;

@AutoConfigureMockMvc
@ExtendWith(SpringExtension.class)
@WebMvcTest(controllers = MovimentationController.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class MovimentationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    TestRestTemplate testRestTemplate;

    @MockBean
    private MovimentationRepository movimentationRepository;

    @BeforeEach
    public void setUp() {
        movimentationRepository.deleteAll();
    }

    private Movimentation createValidMovimentantion() {
        Movimentation movimentation = new Movimentation();

        return movimentation;
    }

    @Test
    public void postUser_whenMovimentationIsValid_userSavedToDatabase() {
        Movimentation movimentation = createValidMovimentantion();

        ResponseEntity<Object> response =
                testRestTemplate.postForEntity("/api/user/movimentation", movimentation, Object.class);
        assertThat( movimentationRepository.count() ).isEqualTo(1);
    }

}
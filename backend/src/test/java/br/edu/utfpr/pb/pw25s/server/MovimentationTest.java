package br.edu.utfpr.pb.pw25s.server;

import br.edu.utfpr.pb.pw25s.server.controller.MovimentationController;
import br.edu.utfpr.pb.pw25s.server.enums.AccountType;
import br.edu.utfpr.pb.pw25s.server.enums.TransactionType;
import br.edu.utfpr.pb.pw25s.server.model.Account;
import br.edu.utfpr.pb.pw25s.server.model.Category;
import br.edu.utfpr.pb.pw25s.server.model.Movimentation;
import br.edu.utfpr.pb.pw25s.server.model.User;
import br.edu.utfpr.pb.pw25s.server.repository.MovimentationRepository;
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

import java.math.BigDecimal;
import java.time.LocalDate;

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

    private Category createValidCategory(){
        Category category = new Category();
        category.setName("category-test");
        return category;
    }

    private User createValidUser() {
        User user = new User();
        user.setUsername("Pegorini");
        user.setDisplayName("pegorini");
        user.setPassword("12345");
        return user;
    }

    private Account createValidAccount() {
        Account account = new Account();
        account.setCode(1l);
        account.setBank("Banco Teste");
        account.setBank_branch("12345");
        account.setType(AccountType.CC);
        account.setBalance(new BigDecimal(500));
        account.setUser(createValidUser());
        return account;
    }

    private Movimentation createValidMovimentantion() {
        Movimentation movimentation = new Movimentation();
        movimentation.setAccount(createValidAccount());
        movimentation.setCategory(createValidCategory());
        movimentation.setValue(new BigDecimal(100));
        movimentation.setDue_date(LocalDate.now());
        movimentation.setPaidValue(new BigDecimal(0));
        movimentation.setDescription("descricaoteste");
        movimentation.setType(TransactionType.Despesa);
        return movimentation;
    }

    @Test
    @DisplayName("Should return ok if valid object")
    public void postMovimentation_whenMovimentationIsValid_receiveOk(){
        Movimentation mov = createValidMovimentantion();
        ResponseEntity<Object> response = testRestTemplate.postForEntity("/api/movimentation/registrar", mov, Object.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    @DisplayName("Should return the database populated size if the object is valid")
    public void postMovimentation_whenMovimentationIsValid_saveInDatabase(){
        Movimentation mov = createValidMovimentantion();
        testRestTemplate.postForEntity("/api/movimentation/registrar", mov, Object.class);

        assertThat( movimentationRepository.count() ).isEqualTo(1);
    }

}
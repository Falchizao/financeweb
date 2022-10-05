package br.edu.utfpr.pb.pw25s.server;

import br.edu.utfpr.pb.pw25s.server.enums.AccountType;
import br.edu.utfpr.pb.pw25s.server.model.Account;
import br.edu.utfpr.pb.pw25s.server.model.User;
import br.edu.utfpr.pb.pw25s.server.repository.AccountRepository;
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

import static org.assertj.core.api.Assertions.assertThat;

@AutoConfigureMockMvc
@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
@WebMvcTest(controllers = AccountTest.class)
public class AccountTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    TestRestTemplate testRestTemplate;

    @MockBean
    private AccountRepository accountRepository;

    @BeforeEach
    public void setUp() {
        accountRepository.deleteAll();
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

    @Test
    @DisplayName("Should return ok if valid object")
    public void postCategory_whenAccountIsValid_receiveOk(){
        Account acc = createValidAccount();
        ResponseEntity<Object> response = testRestTemplate.postForEntity("/api/account/registrar", acc, Object.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    @DisplayName("Should return the database populated size if the object is valid")
    public void postAcc_whenAccIsValid_saveInDatabase(){
        Account acc = createValidAccount();
        testRestTemplate.postForEntity("/api/account/registrar", acc, Object.class);

        assertThat( accountRepository.count() ).isEqualTo(1);
    }

}
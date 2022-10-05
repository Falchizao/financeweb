package br.edu.utfpr.pb.pw25s.server;

import br.edu.utfpr.pb.pw25s.server.model.Category;
import br.edu.utfpr.pb.pw25s.server.repository.CategoryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class CategoryTest {

    @Autowired
    TestRestTemplate testRestTemplate;

    @Autowired
    CategoryRepository categoryRepository;

    private Category createValidCategory(){
        Category category = new Category();
        category.setName("category-test");
        return category;
    }

    @BeforeEach
    public void setUp() {
        categoryRepository.deleteAll();
    }

    @Test
    @DisplayName("Should return ok if valid object")
    public void postCategory_whenCategoryIsValid_receiveOk(){
        Category category = createValidCategory();
        ResponseEntity<Object> response = testRestTemplate.postForEntity("/api/category/registrar", category, Object.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    @DisplayName("Should return the database populated size if the object is valid")
    public void postCategory_whenCategoryIsValid_saveInDatabase(){
        Category category = createValidCategory();
        testRestTemplate.postForEntity("/api/category/registrar", category, Object.class);

        assertThat( categoryRepository.count() ).isEqualTo(1);
    }
}

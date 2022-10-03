package br.edu.utfpr.pb.pw25s.server.service;

import br.edu.utfpr.pb.pw25s.server.dto.MovimentationDTO;
import br.edu.utfpr.pb.pw25s.server.model.Account;
import br.edu.utfpr.pb.pw25s.server.model.Category;
import org.springframework.stereotype.Service;

@Service
public class UtilsService {

    private final AccountCRUDService accountCRUDService;
    private final CategoryCRUDService categoryCRUDService;

    public UtilsService(AccountCRUDService accountCRUDService, CategoryCRUDService categoryCRUDService){
        this.accountCRUDService = accountCRUDService;
        this.categoryCRUDService = categoryCRUDService;
    }

    public MovimentationDTO syncTransaction(MovimentationDTO model){
        Category category = categoryCRUDService.findByName(model.getCategory().getName());
        model.setCategory(category);

        Account account = accountCRUDService.findByIdentificators(model.getAccount().getBank(), model.getAccount().getBank_branch(),
                model.getAccount().getCode());
        model.setAccount(account);
        return model;
    }
}

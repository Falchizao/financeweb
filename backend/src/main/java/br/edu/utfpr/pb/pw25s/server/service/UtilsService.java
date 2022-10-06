package br.edu.utfpr.pb.pw25s.server.service;

import br.edu.utfpr.pb.pw25s.server.dto.MovimentationDTO;
import br.edu.utfpr.pb.pw25s.server.handler.modelException.ResourceNotFound;
import br.edu.utfpr.pb.pw25s.server.model.Account;
import br.edu.utfpr.pb.pw25s.server.model.Category;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
public class UtilsService {

    private final AccountCRUDService accountCRUDService;
    private final CategoryCRUDService categoryCRUDService;
    private final ModelMapper modelMapper;

    public UtilsService(AccountCRUDService accountCRUDService, CategoryCRUDService categoryCRUDService){
        this.accountCRUDService = accountCRUDService;
        this.categoryCRUDService = categoryCRUDService;
        this.modelMapper = new ModelMapper();
    }

    public MovimentationDTO syncTransaction(MovimentationDTO model){
        Category category = modelMapper.map(categoryCRUDService.getById(model.getCategory().getId())
                .orElseThrow(() -> new ResourceNotFound("Category Not found!")), Category.class);
        model.setCategory(category);

        Account account = modelMapper.map(accountCRUDService.getById(model.getAccount().getId())
                .orElseThrow(() -> new ResourceNotFound("Account Not found!")), Account.class);
        model.setAccount(account);
        return model;
    }
}

package com.ritzilee.web.controller;

import org.springframework.boot.autoconfigure.web.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * This controller is used for redirecting all types of server or client error
 * redirects back to the index.html page.
 *
 * Only used for single page applications.
 *
 * Created by Steve Liem on 24/04/2017.
 */
@Controller
public class SingleResourceErrorController implements ErrorController {

    private static final String PATH = "/error";

    @RequestMapping(value = PATH)
    public String error() {
        return "index";
    }

    @Override
    public String getErrorPath() {
        return "/";
    }

}

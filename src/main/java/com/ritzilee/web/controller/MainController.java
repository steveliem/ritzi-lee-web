package com.ritzilee.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Main controller for index page.
 *
 * Created by Steve Liem on 24/04/2017.
 */
@Controller
public class MainController {

    @RequestMapping("/")
    String index() {
        return "index";
    }

}

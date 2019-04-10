/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package khainq.controller.serviceController.userService.accountService;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import khainq.controller.ReadBodyRequest;
import khainq.modals.tbl_Accounts.Tbl_AccountsDAO;
import khainq.modals.tbl_Accounts.Tbl_AccountsDTO;

/**
 *
 * @author khainguyenquang
 */
public class CreateAccount extends HttpServlet {

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("test/json;charset=UTF-8");
        PrintWriter pw = response.getWriter();
        Gson gson = new GsonBuilder().setPrettyPrinting().create();

        ReadBodyRequest bodyRequest = new ReadBodyRequest();
        String jsonBody = bodyRequest.getJsonBody(request);

        Tbl_AccountsDTO user = gson.fromJson(jsonBody, Tbl_AccountsDTO.class);

        try {
            Tbl_AccountsDAO dao = new Tbl_AccountsDAO();
            boolean check = dao.createAccount(user);
            if (check) {
                response.setStatus(200);
            }
        } catch (Exception e) {

            log("ERROR at CreateAccount controller: " + e.getMessage());
            if (e.getMessage().contains("duplicate key")) {
                response.setStatus(400);
            } else {
                response.setStatus(404);

            }

        }
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}

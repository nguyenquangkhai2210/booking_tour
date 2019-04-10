/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package khainq.controller.serviceController.userService.accountService;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import khainq.modals.tbl_Accounts.Tbl_AccountsDAO;
import khainq.security.TokenAuthencationService;

/**
 *
 * @author khainguyenquang
 */
public class LoginController extends HttpServlet {

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
        response.setContentType("text/json;charset=UTF-8");
        PrintWriter pw = response.getWriter();

        String username = request.getParameter("username");
        String password = request.getParameter("password");

        try {
            Tbl_AccountsDAO dao = new Tbl_AccountsDAO();
            String role = dao.checkLogin(username, password);
            
            if (role.equals("admin") || role.equals("user")) {
                TokenAuthencationService tokenAuth = new TokenAuthencationService();
                String token = tokenAuth.addAuthentication(username, role);
                String jsonToken = "{ " + '"' + "Token" + '"' + ':' + '"' + token + '"' + " }";
                pw.append(jsonToken);
                response.setStatus(200);
            } else {
                response.setStatus(404);
            }
        } catch (Exception e) {
            log("ERROR at LoginController: " + e.getMessage());
            response.setStatus(404);
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

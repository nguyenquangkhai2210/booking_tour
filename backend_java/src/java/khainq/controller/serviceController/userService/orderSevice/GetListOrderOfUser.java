/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package khainq.controller.serviceController.userService.orderSevice;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import khainq.modals.tbl_Order.Tbl_OrderDAO;
import khainq.modals.tbl_Order.Tbl_OrderDTO;
import khainq.security.TokenAuthencationService;

/**
 *
 * @author khainguyenquang
 */
public class GetListOrderOfUser extends HttpServlet {

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
        response.setContentType("test/json; charset = UTF-8");
        PrintWriter pw = response.getWriter();

        TokenAuthencationService authencationService = new TokenAuthencationService();

        String role = authencationService.getRoleFromAuthentication(request);
        String username = authencationService.getUserFromAuthentication(request);

        try {
            if (role.equals("user")) {
                Tbl_OrderDAO orderDAO = new Tbl_OrderDAO();
                List<Tbl_OrderDTO> listOrder = orderDAO.getListOrder(username);

                Gson gson = new GsonBuilder().setPrettyPrinting().create();
                String json = gson.toJson(listOrder);

                pw.append(json);

                response.setStatus(200);
            }
        } catch (Exception e) {
            log("ERROR at GetListOrderOfUser controller: " + e.getMessage());
            response.setStatus(404);
        }
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

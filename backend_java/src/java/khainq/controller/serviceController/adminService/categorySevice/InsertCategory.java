/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package khainq.controller.serviceController.adminService.categorySevice;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import khainq.controller.ReadBodyRequest;
import khainq.modals.tbl_Category.Tbl_CategoryDAO;
import khainq.modals.tbl_Category.Tbl_CategoryDTO;
import khainq.security.TokenAuthencationService;

/**
 *
 * @author khainguyenquang
 */
public class InsertCategory extends HttpServlet {

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

        TokenAuthencationService authencationService = new TokenAuthencationService();
        String role = authencationService.getRoleFromAuthentication(request);

        ReadBodyRequest bodyRequest = new ReadBodyRequest();
        String jsonBody = bodyRequest.getJsonBody(request);
        
        Tbl_CategoryDTO dto = gson.fromJson(jsonBody, Tbl_CategoryDTO.class);
        
        try {
            if(role.equals("admin")){
                Tbl_CategoryDAO dao = new Tbl_CategoryDAO();
                boolean check = dao.insertCategory(dto.getName(), dto.getDescription(), dto.getUrlImage());
                if(check){
                    response.setStatus(200);
                } else {
                    response.setStatus(400);
                }
            }
        } catch (Exception e) {
            log("ERROR at InsertCategory controller: " + e.getMessage());
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

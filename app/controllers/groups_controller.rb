class GroupsController < ApplicationController
    #GET/groups
      def index
        groups = Group.order("created_at DESC")
        render json: groups
      end
    #GET/groups/:id
      def show
        group = Group.find(params[:id])
        render json: group
      end
    
      def create
        group = Group.create(group_param)
        render json: group
      end
    
      def update
        group = Group.find(params[:id])
        group.update(group_param)
        render json: group
      end
    
      def destroy
        group = Group.find(params[:id])
        group.destroy
        head :no_content, status: :ok
      end
      private
        def group_param
          params.require(:group).permit(:title, :done)
        end
end
